import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onAddLeaf: (message: string) => void;
}

export function AddLeafModal({ onAddLeaf }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onAddLeaf(message.trim());
    setMessage("");
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        🍃 Add Leaf
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-card/95 to-muted/95 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-white/20 shadow-2xl animate-scale-in">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent text-center">
              Grow a New Leaf 🌿
            </h2>
            
            <p className="text-sm text-white/70 mb-6 text-center">
              Share your thoughts and watch them bloom on your tree
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-black/30 text-white placeholder-white/50 border border-white/20 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none resize-none transition-all"
              maxLength={200}
            />
            
            <div className="text-right text-xs text-white/50 mb-4">
              {message.length}/200
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setMessage("");
                }}
                className="flex-1 border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Grow Leaf (1 PRIDE)
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddLeafModal;
