import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Trash2, Image, Smile, Send, LogIn } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const STICKERS = [
  "🌈", "🏳️‍🌈", "❤️", "🧡", "💛", "💚", "💙", "💜",
  "✨", "🎉", "🔥", "💖", "🌟", "🦋", "🌸", "🌺",
  "🎭", "🎨", "🎵", "💫", "🌙", "☀️", "🌻", "🦄"
];

export const PublicWall = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    
    const channel = supabase
      .channel('public-wall-changes')
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
      .order("created_at", { ascending: false })
      .limit(10);

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
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to post on the wall",
        variant: "destructive",
      });
      return;
    }

    if (!newPost.trim() && !selectedImage) {
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
        user_id: user.id,
        image_url: selectedImage,
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
      title: "Posted!",
      description: "Your message is now on the wall",
    });
    setNewPost("");
    setSelectedImage(null);
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
      title: "Deleted",
      description: "Post removed",
    });
  };

  const addSticker = (sticker: string) => {
    setNewPost((prev) => prev + sticker);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (post: Post) => {
    const profile = post.profiles;
    return `${profile?.first_name?.[0] || ""}${profile?.last_name?.[0] || ""}`.toUpperCase() || "U";
  };

  const getName = (post: Post) => {
    const profile = post.profiles;
    return `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "Anonymous";
  };

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-pride bg-clip-text text-transparent">
            Community Wall
          </h2>
          <p className="text-xl text-muted-foreground">
            Share your thoughts with the Pride community
          </p>
        </div>

        {/* Post Creation */}
        <Card className="p-6 border-border/50 bg-card mb-8">
          {user ? (
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
                className="resize-none"
              />
              
              {selectedImage && (
                <div className="relative inline-block">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="max-h-40 rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </Button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button variant="ghost" size="sm" asChild>
                      <span>
                        <Image className="h-4 w-4 mr-1" />
                        Photo
                      </span>
                    </Button>
                  </label>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4 mr-1" />
                        Stickers
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <div className="grid grid-cols-6 gap-1">
                        {STICKERS.map((sticker, idx) => (
                          <button
                            key={idx}
                            onClick={() => addSticker(sticker)}
                            className="text-2xl p-2 hover:bg-muted rounded transition-colors"
                          >
                            {sticker}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button onClick={handleCreatePost} disabled={loading}>
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Sign in to share your thoughts with the community
              </p>
              <Link to="/auth">
                <Button>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In to Post
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6 border-border/50 bg-card">
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
                  <p className="text-foreground/90 mb-4 whitespace-pre-wrap">{post.content}</p>
                  
                  {post.image_url && (
                    <img 
                      src={post.image_url} 
                      alt="Post image" 
                      className="max-w-full max-h-80 rounded-lg mb-4"
                    />
                  )}
                  
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
          
          {posts.length === 0 && (
            <Card className="p-12 text-center border-border/50 bg-card">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Be the first to share something!</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
