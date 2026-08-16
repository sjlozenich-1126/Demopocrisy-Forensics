import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Share2, 
  Download
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
  const [activeArticle, setActiveArticle] = useState<Article | null>(() => {
    return articles.find((a) => a.id === selectedArticleId) || null;
  });

  // Keep in sync when parent passes a new selectedArticleId
  useEffect(() => {
    if (selectedArticleId) {
      const found = articles.find((a) => a.id === selectedArticleId);
      if (found) setActiveArticle(found);
    }
  }, [selectedArticleId, articles]);

  // Comment state for active article
  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Investigative Report', label: 'Investigative' },
    { id: 'Legal Audit', label: 'Legal Audits' },
    { id: 'Forensics', label: 'Forensics' },
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
    setActiveArticle(art);
    onSelectArticle(art.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddArticleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !commenterName.trim() || !commentText.trim()) return;

    addComment({
      targetType: 'article',
      targetId: activeArticle.id,
      authorName: commenterName.trim(),
      content: commentText.trim()
    });

    setCommenterName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const currentArticleComments = activeArticle
    ? comments.filter((c) => c.targetType === 'article' && c.targetId === activeArticle.id)
    : [];

  // ─── FULL PAGE ARTICLE VIEW ───────────────────────────────────────────────
  if (activeArticle) {
    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-white">
        {/* Back bar */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b-2 border-black pb-4">
          <button
            onClick={handleCloseArticle}
            className="flex items-center gap-2 text-sm font-serif font-bold uppercase tracking-wider text-black hover:text-[#FF3B00] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            All Investigations
          </button>
          <div className="flex items-center gap-2 text-xs font-serif text-neutral-500">
            <span className="bg-[#FF3B00] text-white text-[10px] px-2 py-0.5 font-black uppercase tracking-wider">
              {activeArticle.category}
            </span>
            <span className="hidden sm:inline">{activeArticle.date} · {activeArticle.readTime}</span>
          </div>
        </div>

        {/* Meta + Headline */}
        <header className="space-y-5 mb-10">
          <div>
            <div className="text-sm font-serif font-bold text-[#FF3B00]">
              {activeArticle.author}
            </div>
            <div className="text-xs font-serif text-neutral-500">
              {activeArticle.date}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-black leading-[1.08]">
            {activeArticle.title}
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-neutral-700 font-serif font-normal">
            {activeArticle.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 border border-neutral-400 hover:border-black text-xs font-serif font-bold text-black flex items-center gap-1.5 cursor-pointer transition"
            >
              <Share2 className="w-3.5 h-3.5 text-[#FF3B00]" />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 border border-neutral-400 hover:border-black text-xs font-serif font-bold text-black flex items-center gap-1.5 cursor-pointer transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </header>

        {/* Hero image */}
        <figure className="mb-10 space-y-2">
          <div className="overflow-hidden border-2 border-black">
            <img
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover filter grayscale contrast-125"
            />
          </div>
          {activeArticle.imageCaption && (
            <figcaption className="text-xs font-serif text-neutral-600 italic">
              {activeArticle.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Author note */}
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 text-sm font-serif text-neutral-800 leading-relaxed">
          <strong>{activeArticle.author}</strong> is an independent forensic investigator auditing constitutional rights and due process standards under Washington State administrative law.
        </div>

        {/* Video block if present */}
        {activeArticle.videoUrl && (
          <div className="mb-10 border-2 border-black bg-black p-4 space-y-2">
            <div className="aspect-video bg-neutral-950 flex flex-col items-center justify-center text-center p-6 relative border border-white/10">
              <div className="w-14 h-14 rounded-full bg-[#FF3B00] text-white flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <p className="text-white text-xs font-serif font-bold uppercase tracking-widest">
                Investigative Footage
              </p>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="prose-editorial text-base leading-relaxed text-neutral-900 font-serif space-y-6">
          {activeArticle.content.split('\n\n').map((paragraph, pIdx) => {
            if (pIdx === 0) {
              const firstChar = paragraph.charAt(0);
              const remainingParagraph = paragraph.slice(1);
              return (
                <div key={pIdx} className="clearfix">
                  <div className="w-10 h-1.5 bg-black mb-1.5"></div>
                  <p className="text-lg leading-relaxed font-serif font-normal">
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
                <blockquote key={pIdx} className="border-l-4 border-[#FF3B00] pl-4 italic font-serif font-normal text-xl text-black my-6">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return <p key={pIdx} className="leading-relaxed font-serif font-normal text-lg text-neutral-800">{paragraph}</p>;
          })}
        </div>

        {/* Related cases */}
        {activeArticle.relatedCases.length > 0 && (
          <div className="mt-12 p-5 bg-neutral-50 border-2 border-black space-y-3">
            <div className="text-xs font-serif font-bold uppercase text-[#FF3B00] tracking-wider">
              Associated Case Files
            </div>
            <div className="flex flex-wrap gap-2">
              {activeArticle.relatedCases.map((caseNum) => (
                <button
                  key={caseNum}
                  onClick={() => {
                    onSelectCase(caseNum);
                    setActiveArticle(null);
                  }}
                  className="px-4 py-2 bg-white hover:bg-black hover:text-white border-2 border-black font-serif text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-[#FF3B00]" /> Docket #{caseNum} →
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mt-14 pt-8 border-t-2 border-black space-y-6">
          <h4 className="text-xs font-serif uppercase font-bold tracking-widest text-black flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF3B00]" /> 
            Public Notes ({currentArticleComments.length})
          </h4>

          <div className="space-y-3">
            {currentArticleComments.length === 0 ? (
              <p className="text-sm font-serif text-neutral-500 py-4 text-center bg-neutral-50 border border-neutral-200">
                No public notes yet. Add an observation below.
              </p>
            ) : (
              currentArticleComments.map((com) => (
                <div key={com.id} className="p-4 bg-white border border-neutral-200 space-y-1">
                  <div className="flex justify-between items-center text-xs font-serif text-neutral-500">
                    <strong className="text-black">{com.authorName}</strong>
                    <span>{com.date}</span>
                  </div>
                  <p className="text-sm text-neutral-800 font-serif">{com.content}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddArticleComment} className="p-5 sm:p-6 bg-neutral-50 border-2 border-black space-y-3">
            <h5 className="font-serif text-xs font-bold uppercase text-black">
              Submit Observation
            </h5>

            {commentSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-600 text-xs font-serif text-emerald-800 flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Observation recorded.</span>
              </div>
            )}

            <input
              type="text"
              placeholder="Your name or organization"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              required
              className="w-full bg-white border-2 border-black p-2.5 text-sm focus:outline-none focus:border-[#FF3B00] font-serif"
            />
            <textarea
              rows={3}
              placeholder="Statutory citations, corroborating evidence, or witness details..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              className="w-full bg-white border-2 border-black p-2.5 text-sm focus:outline-none focus:border-[#FF3B00] font-serif"
            />
            <button
              type="submit"
              className="bg-[#FF3B00] hover:bg-black text-white px-5 py-2.5 text-xs font-serif font-black uppercase tracking-widest transition cursor-pointer flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
          </form>
        </div>

        {/* Bottom back */}
        <div className="mt-12 pt-6 border-t border-neutral-200">
          <button
            onClick={handleCloseArticle}
            className="flex items-center gap-2 text-sm font-serif font-bold uppercase tracking-wider text-black hover:text-[#FF3B00] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Investigations
          </button>
        </div>
      </article>
    );
  }

  // ─── LIST VIEW ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 bg-white">
      
      {/* Page header */}
      <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-black tracking-tight">
            Special Investigations
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-serif italic mt-2 max-w-2xl">
            In-depth forensic reporting and evidentiary audits examining Washington State due process.
          </p>
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-neutral-50 border-2 border-black py-2 pl-9 pr-3 text-xs w-full focus:outline-none focus:border-[#FF3B00] font-serif font-bold uppercase"
          />
        </div>
      </div>

      {/* Category filters - cleaner */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-serif -mx-1 px-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 uppercase tracking-wider text-xs font-bold transition cursor-pointer border whitespace-nowrap ${
              selectedCategory === c.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="divide-y divide-neutral-200">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => handleOpenArticle(art)}
            className="py-7 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start group cursor-pointer"
          >
            {/* Image */}
            <div className="md:col-span-4 aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-200 relative">
              <img
                src={art.featuredImage}
                alt={art.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-[1.03] transition-transform duration-500"
              />
              {art.mediaType === 'video' && (
                <span className="absolute top-2 left-2 bg-[#FF3B00] text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                  <Tv className="w-3 h-3" /> Video
                </span>
              )}
              {art.mediaType === 'audio' && (
                <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                  <Volume2 className="w-3 h-3 text-[#FF3B00]" /> Audio
                </span>
              )}
            </div>

            {/* Headline */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-black leading-snug group-hover:text-[#FF3B00] transition-colors">
                {art.title}
              </h3>
              <div className="text-xs font-serif text-[#FF3B00] font-bold">
                {art.author} <span className="text-neutral-500 font-normal">· {art.date}</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="md:col-span-4">
              <p className="text-sm text-neutral-600 font-serif leading-relaxed line-clamp-4">
                {art.summary}
              </p>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <p className="py-12 text-center text-neutral-500 font-serif">No investigations match your search.</p>
        )}
      </div>
    </div>
  );
};
