"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Url = {
  _id: string;
  shortUrl: string;
  clicks: number;
};

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [topLinks, setTopLinks] = useState<Url[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://url-shortener-1-vpcl.onrender.com/shorten", {
        originalUrl,
      });
      const { newUrl } = res.data;
      setShortUrl(newUrl.shortUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTopLinks = async () => {
      try {
        const res = await axios.get("https://url-shortener-1-vpcl.onrender.com/top");
        setTopLinks(res.data.data);
      } catch (error) {
        console.error("Error fetching top links:", error);
      }
    };
    fetchTopLinks();
  }, []);

  const totalClicks = topLinks.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl space-y-6">
        {/* URL Shortener Card */}
        <Card className="w-full min-h-[300px]">
          <CardHeader>
            <CardTitle>🔗 URL Shortener</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
              <div className="space-y-4 flex-1">
                <Input
                  type="url"
                  placeholder="Enter your URL"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating..." : "Shorten URL"}
                </Button>
              </div>

              {shortUrl && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800 mb-2">Short URL Created!</p>
                  <a
                    href={shortUrl}
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortUrl}
                  </a>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Top Performing Links Card */}
        <Card className="w-full min-h-[400px]">
          <CardHeader>
            <CardTitle>🔥 Top Performing Links</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            {/* Top Links List */}
            <div className="flex-1 mb-6">
              {topLinks.length > 0 ? (
                <div className="space-y-3">
                  {topLinks.map((link, index) => (
                    <div
                      key={link._id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <a
                          href={link.shortUrl}
                          className="text-blue-500 hover:text-blue-700 underline font-medium flex-1 break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.shortUrl}
                        </a>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700">
                          {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No links yet. Create your first short URL!</p>
                </div>
              )}
            </div>

            {/* Stats Section - Vertically at the bottom */}
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{topLinks.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Total Links</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
                  <div className="text-sm text-gray-600 font-medium">Total Clicks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
