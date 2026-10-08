import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NetworkNode } from '../types';
import { 
  Network, 
  Search, 
  ArrowRight, 
  Activity, 
  Scale, 
  Building2, 
  ShieldAlert, 
  CheckCircle2,
  Info,
  Maximize2
} from 'lucide-react';

export const NetworkAnalysisView: React.FC = () => {
  const { networkNodes, networkEdges } = useData();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(networkNodes[0] || null);
  const [activeClusterTab, setActiveClusterTab] = useState<'visualizer' | 'directory'>('visualizer');

  const filteredNodes = networkNodes.filter((node) => {
    const matchesType = selectedType === 'all' || node.type === selectedType;
    const matchesSearch =
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const connectedEdges = networkEdges.filter(
    (edge) => edge.source === selectedNode?.id || edge.target === selectedNode?.id
  );

  // Grouped nodes by category for topological overview
  const casesNodes = networkNodes.filter(n => n.type === 'case');
  const agencyNodes = networkNodes.filter(n => n.type === 'agency');
  const failureNodes = networkNodes.filter(n => n.type === 'failure_mode');
  const reformNodes = networkNodes.filter(n => n.type === 'reform');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14 bg-transparent overflow-x-hidden">
      
      {/* Editorial Page Masthead */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
          // SOCIAL NETWORK ANALYSIS (SNA) • 57-NODE TOPOLOGY AUDIT
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black tracking-tight leading-[1.08]">
          Procedural Justice & Systems Failure Network Model
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          A quantitative topological audit mapping 57 institutional nodes and 80 directional connections across 7 court dockets, 18 public agencies, 19 systemic failure modes, and 10 legislative reform prescriptions.
        </p>
      </div>

      {/* Network Overview Key Stats - 100% Mobile Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 border-2 border-black">
          <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Total Nodes</span>
          <div className="text-2xl sm:text-4xl font-black text-black font-serif mt-1">57</div>
          <span className="text-[11px] text-neutral-600 font-serif mt-1 block">4 Core Types</span>
        </div>

        <div className="bg-white p-4 sm:p-5 border-2 border-black">
          <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Connections</span>
          <div className="text-2xl sm:text-4xl font-black text-black font-serif mt-1">80</div>
          <span className="text-[11px] text-neutral-600 font-serif mt-1 block">6 Relational Types</span>
        </div>

        <div className="bg-white p-4 sm:p-5 border-2 border-black">
          <span className="text-[11px] font-mono font-bold text-[#FF3B00] uppercase tracking-wider block">#1 Structural Bridge</span>
          <div className="text-base sm:text-lg font-black text-black font-serif mt-1 truncate">Seattle Police Dept</div>
          <span className="text-[11px] text-neutral-600 font-mono mt-1 block">Betweenness: 0.0040</span>
        </div>

        <div className="bg-white p-4 sm:p-5 border-2 border-black">
          <span className="text-[11px] font-mono font-bold text-black uppercase tracking-wider block">#1 Central Case</span>
          <div className="text-base sm:text-lg font-black text-black font-serif mt-1 truncate">21-1-04347-2 SEA</div>
          <span className="text-[11px] text-neutral-600 font-mono mt-1 block">Degree: 15 (35% Reach)</span>
        </div>

        <div className="bg-[#FF3B00] text-white p-4 sm:p-5 border-2 border-black col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono font-black text-white uppercase tracking-wider block">#1 Reform Demand</span>
          <div className="text-base sm:text-lg font-black text-white font-serif mt-1 truncate">Competency Oversight</div>
          <span className="text-[11px] text-white/90 font-mono mt-1 block">In-Degree: 3 Tracks</span>
        </div>
      </div>

      {/* The Four Key Structural Findings Callout */}
      <div className="bg-black text-white p-5 sm:p-8 md:p-10 border-4 border-black space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="w-10 h-1 bg-[#FF3B00] mb-2"></div>
          <span className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
            // EXECUTIVE TOPOLOGICAL AUDIT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white mt-1">
            Four Core Structural Conclusions from Network Topology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
          <div className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#FF3B00] font-mono text-sm">01.</span>
              <span>The Network Has One Structural Bridge: SPD (0.0040)</span>
            </h3>
            <p className="text-neutral-300 font-serif leading-relaxed text-xs sm:text-sm">
              The Seattle Police Department holds the only meaningful betweenness centrality in the entire network. Every other institutional actor has near-zero betweenness. Accountability bottlenecks at the law enforcement intake point before reaching prosecutorial or judicial review.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#FF3B00] font-mono text-sm">02.</span>
              <span>Cases Are The Network's True Connective Infrastructure</span>
            </h3>
            <p className="text-neutral-300 font-serif leading-relaxed text-xs sm:text-sm">
              Legal cases—not agencies—hold the highest degree (7–15), closeness, and reach. Agencies are functionally passive receiving nodes with zero outdegree. Cases are the primary connective tissue aggregating failure modes and reform requirements.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#FF3B00] font-mono text-sm">03.</span>
              <span>Competency Pipeline Is The Most Efficient Harm Propagator</span>
            </h3>
            <p className="text-neutral-300 font-serif leading-relaxed text-xs sm:text-sm">
              Case 658959 achieved the highest Reach Efficiency (0.025). A single undocumented medical transfer rapidly cascaded through Harborview, DOC, and the competency framework, establishing clinical diversion as the most economical path for detention without adjudication.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#FF3B00] font-mono text-sm">04.</span>
              <span>Detention Incentive Is An Unaddressed Root Cause</span>
            </h3>
            <p className="text-neutral-300 font-serif leading-relaxed text-xs sm:text-sm">
              Case 664676 contains the only coded "Root Cause Mechanism" (detention data leveraging police union recruitment bonuses), yet this root cause currently has no mapped reform node in standard municipal policy agendas.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Network Topological Explorer & Cluster Map */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black pb-3">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-black">
              Interactive Systemic Node Explorer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-serif">
              Click any node in the interactive clusters or index below to inspect centrality scores and connected edges.
            </p>
          </div>

          {/* Cluster Category Switcher */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: 'All (57)' },
              { id: 'case', label: 'Cases (7)' },
              { id: 'agency', label: 'Agencies (18)' },
              { id: 'failure_mode', label: 'Failures (19)' },
              { id: 'reform', label: 'Reforms (10)' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1 uppercase font-bold transition cursor-pointer border ${
                  selectedType === t.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Layout: Node Directory & Deep Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Node Directory (5 Cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-black p-4 sm:p-5 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-black absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search nodes by name or entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border-2 border-black focus:outline-none focus:border-[#FF3B00] font-mono font-bold"
              />
            </div>

            {/* Node List Scrollbox */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3 border-2 text-xs cursor-pointer transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-white hover:bg-neutral-50 text-black border-neutral-200 hover:border-black'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          node.type === 'case'
                            ? 'bg-[#FF3B00]'
                            : node.type === 'agency'
                            ? 'bg-neutral-400'
                            : node.type === 'failure_mode'
                            ? 'bg-red-600'
                            : 'bg-emerald-500'
                        }`}></span>
                        <span className={`text-[10px] font-mono uppercase font-bold truncate ${
                          isSelected ? 'text-[#FF3B00]' : 'text-neutral-500'
                        }`}>
                          {node.categoryName}
                        </span>
                      </div>
                      <h4 className="font-serif font-black text-sm leading-snug truncate">
                        {node.label}
                      </h4>
                    </div>

                    <div className="text-right font-mono text-[11px] shrink-0">
                      <span className={`px-2 py-0.5 font-bold ${
                        isSelected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black'
                      }`}>
                        {node.degree} conn
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Inspector & Relational Edges (7 Cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-5 sm:p-7 space-y-6">
            {selectedNode ? (
              <div className="space-y-6">
                <div className="border-b-2 border-black pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-white bg-black">
                      {selectedNode.categoryName}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">ID: {selectedNode.id}</span>
                  </div>
                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-black leading-tight">
                    {selectedNode.label}
                  </h3>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-black uppercase text-[#FF3B00] tracking-wider">
                    Topological Analysis & Description
                  </h4>
                  <p className="text-sm text-neutral-800 leading-relaxed font-serif bg-neutral-50 p-4 sm:p-5 border border-neutral-300">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Node Centrality Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="p-3 bg-white border-2 border-black">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block">Degree</span>
                    <span className="font-black text-black text-lg">{selectedNode.degree}</span>
                  </div>
                  {selectedNode.betweenness !== undefined && (
                    <div className="p-3 bg-white border-2 border-black">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block">Betweenness</span>
                      <span className="font-black text-[#FF3B00] text-lg">{selectedNode.betweenness.toFixed(4)}</span>
                    </div>
                  )}
                  {selectedNode.closeness !== undefined && (
                    <div className="p-3 bg-white border-2 border-black">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block">Closeness</span>
                      <span className="font-black text-black text-lg">{selectedNode.closeness.toFixed(3)}</span>
                    </div>
                  )}
                  {selectedNode.reach !== undefined && (
                    <div className="p-3 bg-white border-2 border-black">
                      <span className="text-neutral-500 text-[10px] uppercase font-bold block">Reach</span>
                      <span className="font-black text-black text-lg">{(selectedNode.reach * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>

                {/* Connected Edges & Relational Links */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-xs font-black uppercase text-black">
                    Connected Relational Edges ({connectedEdges.length})
                  </h4>
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {connectedEdges.map((edge) => {
                      const otherNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = networkNodes.find((n) => n.id === otherNodeId);
                      const isOutbound = edge.source === selectedNode.id;

                      return (
                        <div
                          key={edge.id}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-3 bg-neutral-50 hover:bg-black hover:text-white border border-neutral-300 hover:border-black text-xs flex items-center justify-between cursor-pointer transition group"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <span className="font-mono font-bold text-[10px] px-2 py-0.5 bg-white group-hover:bg-neutral-800 text-black group-hover:text-white border border-neutral-300 shrink-0">
                              {edge.type}
                            </span>
                            <span className="font-serif font-bold text-black group-hover:text-white truncate">
                              {otherNode?.label || otherNodeId}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#FF3B00] group-hover:text-[#FF3B00] font-bold shrink-0">
                            {isOutbound ? 'Outbound →' : '← Inbound'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-neutral-500 font-serif italic">
                Select a node from the directory to inspect its metrics and topological connections.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Priority Reform Matrix - Responsive Card/Table Layout */}
      <div className="bg-white border-2 border-black p-5 sm:p-8 space-y-6">
        <div>
          <div className="w-10 h-1 bg-[#FF3B00] mb-2"></div>
          <span className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
            // ACTIONABLE LEGISLATIVE & COURT REMEDIES
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-black mt-1">
            Priority Reform Allocation Matrix
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 font-serif mt-1">
            Prioritized by in-degree demand, reach efficiency, and failure mode severity across all analyzed judicial tracks.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto border-2 border-black">
          <table className="w-full text-xs font-serif text-left">
            <thead className="bg-black text-white font-mono uppercase tracking-wider text-xs">
              <tr>
                <th className="p-3.5 border-b border-black">Priority Tier</th>
                <th className="p-3.5 border-b border-black">Recommended Reform Node</th>
                <th className="p-3.5 border-b border-black">Associated Cases / Tracks</th>
                <th className="p-3.5 border-b border-black">Topological Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white font-serif">
              <tr className="hover:bg-neutral-50">
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-[#FF3B00] text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase">P1 — Critical</span>
                </td>
                <td className="p-3.5 font-bold text-black text-sm">Competency Oversight Reform</td>
                <td className="p-3.5 text-neutral-700 font-mono text-xs">658959, 21-1-04347-2, 22-1-04242-3 SEA</td>
                <td className="p-3.5 text-neutral-800">Highest in-degree (3). Addresses the most efficient harm pipeline across felony & municipal tracks.</td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-[#FF3B00] text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase">P1 — Critical</span>
                </td>
                <td className="p-3.5 font-bold text-black text-sm">Real-Time Digital Tracking + Verification</td>
                <td className="p-3.5 text-neutral-700 font-mono text-xs">658931, 660121, 664676</td>
                <td className="p-3.5 text-neutral-800">Addresses SPD’s zero-feedback arrest loop; directly targets the network’s central betweenness chokepoint.</td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase">P2 — High</span>
                </td>
                <td className="p-3.5 font-bold text-black text-sm">Cross-Database Purge Protocols</td>
                <td className="p-3.5 text-neutral-700 font-mono text-xs">658931, 660121</td>
                <td className="p-3.5 text-neutral-800">Eliminates technical substrate of database-driven wrongful detentions and outdated active flags.</td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase">P2 — High</span>
                </td>
                <td className="p-3.5 font-bold text-black text-sm">Digital Evidence & Warrant Protocols</td>
                <td className="p-3.5 text-neutral-700 font-mono text-xs">658959, 21-1-04347-2</td>
                <td className="p-3.5 text-neutral-800">Closes the warrantless device seizure and chain-of-custody gaps in felony investigations.</td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="p-3.5 whitespace-nowrap">
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase">P2 — High</span>
                </td>
                <td className="p-3.5 font-bold text-black text-sm">Transparency Safeguards for Arresting Agents</td>
                <td className="p-3.5 text-neutral-700 font-mono text-xs">21-1-04347-2, 22-1-04242-3 SEA</td>
                <td className="p-3.5 text-neutral-800">Directly addresses Institutional Opacity—the failure mode with the highest in-degree (3).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Card View */}
        <div className="md:hidden space-y-3">
          {[
            {
              tier: 'P1 — Critical',
              color: 'bg-[#FF3B00] text-white',
              title: 'Competency Oversight Reform',
              cases: '658959, 21-1-04347-2, 22-1-04242-3 SEA',
              rationale: 'Highest in-degree (3). Addresses the most efficient harm pipeline across felony & municipal tracks.'
            },
            {
              tier: 'P1 — Critical',
              color: 'bg-[#FF3B00] text-white',
              title: 'Real-Time Digital Tracking + Verification',
              cases: '658931, 660121, 664676',
              rationale: 'Addresses SPD’s zero-feedback arrest loop; directly targets the network’s central betweenness chokepoint.'
            },
            {
              tier: 'P2 — High',
              color: 'bg-black text-white',
              title: 'Cross-Database Purge Protocols',
              cases: '658931, 660121',
              rationale: 'Eliminates technical substrate of database-driven wrongful detentions and outdated active flags.'
            },
            {
              tier: 'P2 — High',
              color: 'bg-black text-white',
              title: 'Digital Evidence & Warrant Protocols',
              cases: '658959, 21-1-04347-2',
              rationale: 'Closes the warrantless device seizure and chain-of-custody gaps in felony investigations.'
            },
            {
              tier: 'P2 — High',
              color: 'bg-black text-white',
              title: 'Transparency Safeguards for Arresting Agents',
              cases: '21-1-04347-2, 22-1-04242-3 SEA',
              rationale: 'Directly addresses Institutional Opacity—the failure mode with the highest in-degree (3).'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-50 border-2 border-black space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${item.color}`}>
                  {item.tier}
                </span>
              </div>
              <h4 className="font-serif font-black text-base text-black">
                {item.title}
              </h4>
              <div className="text-xs font-mono text-neutral-600">
                <span className="font-bold text-black">Cases:</span> {item.cases}
              </div>
              <p className="text-xs text-neutral-800 font-serif leading-relaxed pt-1 border-t border-neutral-200">
                {item.rationale}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
