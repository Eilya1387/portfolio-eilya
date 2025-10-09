"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, Message } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    checkAuth();
    fetchMessages();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);

      if (error) throw error;

      setMessages(messages.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-2xl text-dark-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Admin <span className="text-dark-accent">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-dark-card rounded-2xl border border-dark-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              Messages
              <span className="text-sm bg-dark-accent text-black px-3 py-1 rounded-full">
                {messages.length}
              </span>
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No messages yet
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedMessage?.id === msg.id
                        ? "bg-dark-accent/20 border-2 border-dark-accent"
                        : "bg-dark-bg border border-dark-border hover:border-dark-accent"
                    }`}
                  >
                    <div className="font-semibold text-white truncate">
                      {msg.name}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {msg.email}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(msg.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-dark-card rounded-2xl border border-dark-border p-6">
            {selectedMessage ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedMessage.name}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-dark-accent hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>

                <div className="bg-dark-bg p-6 rounded-lg border border-dark-border">
                  <h3 className="text-lg font-semibold mb-3">Message:</h3>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your message&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="px-6 py-3 bg-dark-accent text-black font-bold rounded-lg hover:shadow-2xl transition-all"
                  >
                    Reply via Email 📧
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
