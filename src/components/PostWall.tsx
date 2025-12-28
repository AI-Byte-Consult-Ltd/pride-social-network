import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
}

interface PostWallProps {
  onBalanceChange?: () => void;
}

export const PostWall = ({ onBalanceChange }: PostWallProps) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => fetchPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    const { data: postsData, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    if (!postsData || postsData.length === 0) {
      setPosts([]);
      return;
    }

    // Fetch profiles for all post authors
    const userIds = [...new Set(postsData.map(p => p.user_id))];
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .in("id", userIds);

    const profilesMap = new Map(
      (profilesData || []).map(p => [p.id, p])
    );

    const postsWithProfiles: Post[] = postsData.map(post => ({
      ...post,
      profiles: profilesMap.get(post.user_id) || undefined
    }));

    setPosts(postsWithProfiles);
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .insert({
        content: newPost,
        user_id: user?.id,
      });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post created successfully",
    });
    setNewPost("");
  };

  const handleDeletePost = async (postId: string) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post deleted successfully",
    });
  };

  const getInitials = (post: Post) => {
    const profile = post.profiles;
    return `${profile?.first_name?.[0] || ""}${profile?.last_name?.[0] || ""}`.toUpperCase() || "U";
  };

  const getName = (post: Post) => {
    const profile = post.profiles;
    return `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || profile?.email || "User";
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/50 bg-gradient-card">
        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
        <Textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={4}
          className="mb-4"
        />
        <Button onClick={handleCreatePost} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-6 border-border/50 bg-gradient-card">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/20 text-primary">
                  {getInitials(post)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{getName(post)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  {user?.id === post.user_id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <p className="text-foreground/90 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{post.likes_count}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.comments_count}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};