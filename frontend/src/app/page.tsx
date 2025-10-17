"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/shorten", { originalUrl });
      setShortUrl(res.data.newUrl.shortUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🔗 URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="url"
              placeholder="Enter your URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Shorten URL"}
            </Button>
          </form>

          {shortUrl && (
            <p className="mt-4">
              Short URL:{" "}
              <a href={shortUrl} className="text-blue-500 underline" target="_blank">
                {shortUrl}
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


