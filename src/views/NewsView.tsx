import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Article } from '../types';
import { 
  Search, 
  Tv, 
  Volume2, 
  Play, 
  Scale, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  X, 
  Share2, 
  Download, 
  ArrowRight
} from 'lucide-react';

interface NewsViewProps {
  onSelectCase: (caseId: string) => void;
  selectedArticleId?: string;
  onSelectArticle: (articleId: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ 
  onSelectCase, 
  selectedArticleId,
  onSelectArticle 
}) => {
  const { articles, comments, addComment } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(() => {
    return articles.find((a) => a.id === selectedArticleId) || null;
  });

  // Comment state for active article
  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'All Investigations' },
    { id: 'Investigative Report', label: 'Investigative Reports' },
    { id: 'Legal Audit', label: 'Legal Audits' },
    { id: 'Forensics', label: 'Forensic Analyses' },
    { id: 'Deep Dive', label: 'Deep Dives' }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenArticle = (art: Article) => {
    setActiveArticleModal(art);
    onSelectArticle(art.id);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddArticleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticleModal || !commenterName.trim() || !commentText.trim()) return;

    addComment({
      targetType: 'article',
      targetId: activeArticleModal.id,
      authorName: commenterName.trim(),
      content: commentText.trim()
    });

    setCommenterName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const currentArticleComments = activeArticleModal
    ? comments.filter((c) => c.targetType === 'article' && c.targetId === activeArticleModal.id)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 bg-transparent">
      
      {/* Editorial Header Section - The Intercept Style */}
      <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-black tracking-tight">
            Special Investigations
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 font-serif italic mt-2 max-w-3xl">
            In-depth forensic reporting, evidentiary breakdowns, and investigative audits examining Washington State due process and custodial administration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="SEARCH INVESTIGATIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-50 border-2 border-black py-2 pl-9 pr-3 text-xs w-full focus:outline-none focus:border-[#FF3B00] font-serif font-bold uppercase"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-300 pb-3 text-xs font-serif">
        <span className="text-black font-black uppercase text-[12px] tracking-wider">// SECTIONS:</span>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 uppercase tracking-wider text-xs font-bold transition cursor-pointer border ${
              selectedCategory === c.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3-Column List of Investigations (Matching Screenshot 5) */}
      <div className="divide-y divide-neutral-300">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => handleOpenArticle(art)}
            className="py-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group cursor-pointer"
          >
            {/* Col 1: Visual Image Block */}
            <div className="md:col-span-4 aspect-16/10 overflow-hidden bg-neutral-900 border border-neutral-300 relative">
              <img
                src={art.featuredImage}
                alt={art.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-103 transition-transform duration-500"
              />
              {art.mediaType === 'video' && (
                <span className="absolute top-2 left-2 bg-[#FF3B00] text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                  <Tv className="w-3 h-3" /> Video Included
                </span>
              )}
              {art.mediaType === 'audio' && (
                <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                  <Volume2 className="w-3 h-3 text-[#FF3B00]" /> Audio Tape
                </span>
              )}
            </div>

            {/* Col 2: Headline & Author in Bright Orange/Red */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-black leading-snug group-hover:text-[#FF3B00] transition-colors">
                {art.title}
              </h3>
              <div className="text-xs font-serif text-[#FF3B00] font-bold">
                {art.author} <span className="text-neutral-500 font-normal">- {art.date}</span>
              </div>
            </div>

            {/* Col 3: Excerpt */}
            <div className="md:col-span-4">
              <p className="text-sm text-neutral-700 font-serif font-normal leading-relaxed line-clamp-4">
                {art.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Full Reading Modal - Matching Screenshots 2, 3, 6, 7 */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div 
            className="w-full max-w-4xl bg-white border-4 border-black text-black my-8 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Close Bar */}
            <div className="bg-black text-white px-6 py-3.5 flex items-center justify-between border-b-2 border-[#FF3B00]">
              <div className="flex items-center gap-2">
                <span className="bg-[#FF3B00] text-white text-[10px] px-2.5 py-0.5 font-serif font-black uppercase tracking-wider">
                  {activeArticleModal.category}
                </span>
                <span className="text-xs font-serif text-neutral-300">
                  {activeArticleModal.date} • {activeArticleModal.readTime}
                </span>
              </div>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="text-neutral-400 hover:text-white p-1 cursor-pointer"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content Area - Exact Intercept Article Template */}
            <div className="p-6 sm:p-12 max-h-[80vh] overflow-y-auto space-y-8">
              
              {/* Author Row & Meta - Matching Screenshot 2 & 7 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm font-serif font-bold text-[#FF3B00]">
                      {activeArticleModal.author}
                    </div>
                    <div className="text-xs font-serif text-neutral-500">
                      {activeArticleModal.date}, 5:57 a.m. PST
                    </div>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-black leading-[1.08]">
                  {activeArticleModal.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl leading-relaxed text-neutral-800 font-serif font-normal">
                  {activeArticleModal.subtitle}
                </p>

                {/* Share Button Bar - Matching Screenshot 2 */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 border border-neutral-400 hover:border-black text-xs font-serif font-bold text-black flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#FF3B00]" />
                    <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 border border-neutral-400 hover:border-black text-xs font-serif font-bold text-black flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>

              {/* Hero Image with Intercept Caption - Matching Screenshot 2 & 6 */}
              <div className="space-y-2">
                <div className="overflow-hidden border-2 border-black">
                  <img
                    src={activeArticleModal.featuredImage}
                    alt={activeArticleModal.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-[420px] object-cover filter grayscale contrast-125"
                  />
                </div>
                <div className="text-xs font-serif text-neutral-600 italic">
                  Collage: {activeArticleModal.imageCaption}
                </div>
              </div>

              {/* Author Bio Box - Matching Screenshot 3 */}
              <div className="p-4 bg-neutral-50 border border-neutral-300 text-xs font-serif text-neutral-800 leading-relaxed">
                <strong>{activeArticleModal.author}</strong> is an independent forensic investigator auditing constitutional rights and due process standards under Washington State administrative law.
              </div>

              {/* Multimedia / Video Player Preview */}
              {activeArticleModal.videoUrl && (
                <div className="border-2 border-black bg-black p-4 space-y-2">
                  <div className="aspect-video bg-neutral-950 flex flex-col items-center justify-center text-center p-6 relative border border-white/10">
                    <div className="w-16 h-16 rounded-full bg-[#FF3B00] text-white flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition-transform shadow-lg">
                      <Play className="w-7 h-7 ml-1" />
                    </div>
                    <p className="text-white text-xs font-serif font-bold uppercase tracking-widest">
                      Investigative Video Footage & Docket Breakdown
                    </p>
                    <p className="text-[10px] font-mono text-neutral-400 mt-1">
                      Source Archive: {activeArticleModal.videoUrl}
                    </p>
                  </div>
                  <p className="text-xs font-serif text-neutral-300">
                    Surveillance audio-visual logs cross-referenced with King County jail booking timestamps.
                  </p>
                </div>
              )}

              {/* Article Body with Intercept Signature Drop Cap - Matching Screenshot 3 & 7 */}
              <div className="prose-editorial text-base leading-relaxed text-neutral-800 font-serif font-normal space-y-6 pt-2">
                {activeArticleModal.content.split('\n\n').map((paragraph, pIdx) => {
                  const cleanParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '$1');
                  if (pIdx === 0) {
                    /* First paragraph with signature drop cap & normal body text */
                    const firstChar = cleanParagraph.charAt(0);
                    const remainingParagraph = cleanParagraph.slice(1);
                    return (
                      <div key={pIdx} className="clearfix">
                        {/* Horizontal black bar over giant drop cap */}
                        <div className="w-10 h-1.5 bg-black mb-1.5"></div>
                        <p className="text-lg leading-relaxed font-serif font-normal text-neutral-800">
                          <span className="font-black text-4xl float-left mr-2 leading-none font-serif text-black">{firstChar}</span>
                          {remainingParagraph}
                        </p>
                      </div>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-2xl font-serif font-black text-black pt-4 pb-1 border-b border-black">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={pIdx} className="text-3xl font-serif font-black text-black pt-6 pb-2 border-b-2 border-black">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote key={pIdx} className="border-l-4 border-[#FF3B00] pl-4 italic font-serif font-normal text-xl text-neutral-800 my-6">
                        {cleanParagraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  return <p key={pIdx} className="leading-relaxed font-serif font-normal text-lg text-neutral-800">{cleanParagraph}</p>;
                })}
              </div>

              {/* Associated Legal Cases */}
              {activeArticleModal.relatedCases.length > 0 && (
                <div className="p-5 bg-neutral-50 border-2 border-black space-y-3">
                  <div className="text-xs font-serif font-bold uppercase text-[#FF3B00] tracking-wider">
                    Associated Legal Case Files & Dockets
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeArticleModal.relatedCases.map((caseNum) => (
                      <button
                        key={caseNum}
                        onClick={() => {
                          onSelectCase(caseNum);
                          setActiveArticleModal(null);
                        }}
                        className="px-4 py-2 bg-white hover:bg-black hover:text-white border-2 border-black font-serif text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Scale className="w-3.5 h-3.5 text-[#FF3B00]" /> Case Docket #{caseNum} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reader Comments Section */}
              <div className="pt-8 border-t-2 border-black space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-serif uppercase font-bold tracking-widest text-black flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FF3B00]" /> Public Analysis & Research Comments ({currentArticleComments.length})
                  </h4>
                  <span className="text-xs font-serif text-neutral-500">Public Interest Notes</span>
                </div>

                <div className="space-y-3">
                  {currentArticleComments.length === 0 ? (
                    <p className="text-xs font-serif text-neutral-500 py-4 text-center bg-neutral-50 border border-neutral-300">
                      No public notes recorded on this investigation yet. Submit your observation below.
                    </p>
                  ) : (
                    currentArticleComments.map((com) => (
                      <div key={com.id} className="p-4 bg-white border border-neutral-300 space-y-1">
                        <div className="flex justify-between items-center text-xs font-serif text-neutral-500">
                          <strong className="text-black">{com.authorName}</strong>
                          <span>{com.date}</span>
                        </div>
                        <p className="text-sm text-neutral-800 font-serif">{com.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddArticleComment} className="p-6 bg-neutral-50 border-2 border-black space-y-3">
                  <h5 className="font-serif text-xs font-bold uppercase text-black">
                    Submit Corroborating Observation
                  </h5>

                  {commentSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-600 text-xs font-serif text-emerald-800 flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Observation recorded in repository.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name or Organization"
                      value={commenterName}
                      onChange={(e) => setCommenterName(e.target.value)}
                      required
                      className="bg-white border-2 border-black p-2 text-xs focus:outline-none focus:border-[#FF3B00] font-serif"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Submit statutory citations, corroborating evidence, or witness details..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-black p-2.5 text-xs focus:outline-none focus:border-[#FF3B00] font-serif"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF3B00] hover:bg-black text-white px-5 py-2.5 text-xs font-serif font-black uppercase tracking-widest transition cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Observation
                  </button>
                </form>
              </div>

            </div>

            {/* Modal Bottom Close */}
            <div className="p-4 bg-neutral-100 border-t-2 border-black flex justify-between items-center text-xs font-serif">
              <span className="text-neutral-600">Demopocrisy Investigative Archive</span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="bg-black text-white px-4 py-2 font-bold uppercase cursor-pointer hover:bg-[#FF3B00] transition"
              >
                Close Report ✕
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
