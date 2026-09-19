import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Database,
  HeartPulse,
  History,
  Info,
  LogOut,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  XCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Finding, Medication, Risk, SavedCheck } from '@/lib/types';
import { checkInteractions, overallRisk, riskTone } from '@/lib/interactionEngine';

type Page = 'overview' | 'check' | 'insights' | 'knowledge';
type User = { email?: string };

const knowledgeArticles = [
  { category: 'Foundations', title: 'How medication interactions happen', text: 'Interactions can change how a medicine is absorbed, broken down, or eliminated. Some combinations also create additive effects, such as two medicines that both increase bleeding.' },
  { category: 'Safety', title: 'What the severity levels mean', text: 'Major means prompt professional review is appropriate — the combination may be contraindicated. Moderate means the combination may need monitoring, dose adjustment, or an alternative. Minor or no-known-conflict results do not replace a pharmacist review.' },
  { category: 'Practice', title: 'Build a safer medication list', text: 'Include prescription medicines, over-the-counter products, vitamins, and supplements. Record the dose and how often you take each item, and keep the list updated.' },
  { category: 'Clinical context', title: 'Why personal context matters', text: 'Age, kidney and liver health, pregnancy, allergies, and the reason a medicine was prescribed can change the clinical decision. This tool only checks known pair patterns from the reference dataset.' },
  { category: 'Dataset', title: 'About the Project SAFE dataset', text: 'The reference library contains 142 medications and 10,011 pairwise combinations. 51 known interaction rules from the Project SAFE Drug Interaction Dataset are mapped across these combinations, each with severity, mechanism, possible effects, and recommended action.' },
  { category: 'Polypharmacy', title: 'Why combinations matter', text: 'The more medicines you take together, the more pair interactions are possible. With just 10 medicines, there are 45 unique pairs to review. The checker evaluates every pair against the dataset so nothing is missed.' },
];

const popularMeds = ['Warfarin', 'Aspirin', 'Ibuprofen', 'Metformin', 'Atorvastatin'];

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [page, setPage] = useState<Page>('overview');
  const [showAuth, setShowAuth] = useState(false);
  const [checks, setChecks] = useState<SavedCheck[]>([]);
  const [isLoadingChecks, setIsLoadingChecks] = useState(false);
  const [medCount, setMedCount] = useState(142);
  const [comboCount, setComboCount] = useState(10011);
  const [ruleCount, setRuleCount] = useState(51);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuth(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.from('medications').select('*', { count: 'exact', head: true }).then(({ count }) => { if (count) setMedCount(count); });
    supabase.from('drug_combinations').select('*', { count: 'exact', head: true }).then(({ count }) => { if (count) setComboCount(count); });
    supabase.from('interaction_rules').select('*', { count: 'exact', head: true }).then(({ count }) => { if (count) setRuleCount(count); });
  }, []);

  useEffect(() => {
    if (!user) { setChecks([]); return; }
    setIsLoadingChecks(true);
    supabase.from('saved_interaction_checks').select('id, medications, interactions, risk_level, created_at').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setChecks(data as SavedCheck[]);
      setIsLoadingChecks(false);
    });
  }, [user]);

  if (authLoading) return <div className="loading-screen"><Activity className="spin" size={24} /><span>Preparing your secure workspace</span></div>;

  const handleSignOut = async () => { await supabase.auth.signOut(); setPage('overview'); };
  const saveCheck = async (medications: string[], interactions: Finding[]) => {
    if (!user) { setShowAuth(true); return; }
    const risk = overallRisk(interactions);
    const { data } = await supabase.from('saved_interaction_checks').insert({ medications, interactions, risk_level: risk }).select('id, medications, interactions, risk_level, created_at').maybeSingle();
    if (data) setChecks((current) => [data as SavedCheck, ...current]);
  };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><ShieldCheck size={22} /></div><div><strong>MedGuard</strong><span>Clinical intelligence</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>
        <NavItem active={page === 'overview'} icon={<Activity size={18} />} label="Overview" onClick={() => setPage('overview')} />
        <NavItem active={page === 'check'} icon={<Stethoscope size={18} />} label="Interaction check" onClick={() => setPage('check')} />
        <NavItem active={page === 'insights'} icon={<Sparkles size={18} />} label="Insights" onClick={() => setPage('insights')} />
        <NavItem active={page === 'knowledge'} icon={<BookOpen size={18} />} label="Knowledge base" onClick={() => setPage('knowledge')} />
      </nav>
      <div className="sidebar-bottom"><div className="source-card"><Database size={17} /><div><strong>Reference library</strong><span>{medCount} meds · {comboCount.toLocaleString()} pairs</span></div></div>{user ? <button className="profile-button" onClick={handleSignOut}><span className="avatar">{getInitials(user.email ?? 'ME')}</span><span className="profile-copy"><strong>{user.email?.split('@')[0]}</strong><small>Sign out</small></span><LogOut size={16} /></button> : <button className="sidebar-login" onClick={() => setShowAuth(true)}>Sign in to save reviews <ArrowRight size={16} /></button>}</div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-brand"><div className="brand-mark"><ShieldCheck size={19} /></div><strong>MedGuard</strong></div><div className="topbar-status"><span className="status-dot" /> Reference system online <span className="divider" /> {user ? <span>{user.email}</span> : <button onClick={() => setShowAuth(true)}>Sign in</button>}</div><button className="menu-button"><Menu size={20} /></button></header>
      {page === 'overview' && <Overview setPage={setPage} checks={checks} isLoadingChecks={isLoadingChecks} medCount={medCount} comboCount={comboCount} ruleCount={ruleCount} />}
      {page === 'check' && <Checker user={user} onSave={saveCheck} onOpenAuth={() => setShowAuth(true)} />}
      {page === 'insights' && <Insights checks={checks} setPage={setPage} />}
      {page === 'knowledge' && <Knowledge medCount={medCount} comboCount={comboCount} ruleCount={ruleCount} />}
    </main>
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
  </div>;
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span>{active && <ChevronRight size={15} className="nav-arrow" />}</button>;
}

function Overview({ setPage, checks, isLoadingChecks, medCount, comboCount, ruleCount }: { setPage: (page: Page) => void; checks: SavedCheck[]; isLoadingChecks: boolean; medCount: number; comboCount: number; ruleCount: number }) {
  const recent = checks.slice(0, 3);
  return <div className="page-wrap"><div className="page-heading"><div><div className="eyebrow">CLINICAL WORKSPACE <span>•</span> PROJECT SAFE</div><h1>Intelligent drug <em>interaction detection</em></h1><p>Review medication combinations against a reference library of {medCount} medicines and {comboCount.toLocaleString()} pairwise interactions.</p></div><button className="primary-button" onClick={() => setPage('check')}><Plus size={17} /> New interaction check</button></div>
    <div className="hero-banner"><div className="hero-icon"><HeartPulse size={23} /></div><div><strong>Medication safety starts with visibility.</strong><p>Enter two or more medicines to surface known pair interactions from the Project SAFE reference dataset.</p></div><button className="text-button" onClick={() => setPage('knowledge')}>Learn how it works <ArrowRight size={15} /></button></div>
    <div className="section-title"><div><span>YOUR WORKSPACE</span><h2>At a glance</h2></div></div><div className="stats-grid"><StatCard label="Reviews completed" value={checks.length.toString()} detail="Your saved checks" icon={<Check size={18} />} tone="green" /><StatCard label="High-risk findings" value={checks.reduce((sum, check) => sum + check.interactions.filter((i) => i.risk === 'High').length, 0).toString()} detail="Across saved reviews" icon={<AlertTriangle size={18} />} tone="amber" /><StatCard label="Medication pairs" value={comboCount.toLocaleString()} detail={`${medCount} medicines indexed`} icon={<Database size={18} />} tone="blue" /><StatCard label="Interaction rules" value={ruleCount.toString()} detail="Known pair patterns" icon={<ShieldCheck size={18} />} tone="teal" /></div>
    <div className="content-grid"><section className="panel activity-panel"><div className="panel-heading"><div><span className="panel-kicker">RECENT ACTIVITY</span><h3>Saved reviews</h3></div><button className="subtle-button" onClick={() => setPage('insights')}>View insights <ArrowRight size={14} /></button></div>{isLoadingChecks ? <div className="empty-state"><Activity className="spin" size={20} /> Loading reviews...</div> : recent.length ? recent.map((check) => <HistoryRow key={check.id} check={check} />) : <div className="empty-state"><History size={20} /><span>Your saved reviews will appear here.</span><button onClick={() => setPage('check')}>Start your first check</button></div>}</section><section className="panel quick-panel"><div className="panel-heading"><div><span className="panel-kicker">QUICK START</span><h3>Make a review</h3></div><Sparkles size={18} className="panel-icon" /></div><p>Add the medicines you want to review. Every unique pair is checked against {comboCount.toLocaleString()} combinations in the dataset.</p><div className="mini-flow"><div><span>01</span> Add medicines</div><div><span>02</span> Match interactions</div><div><span>03</span> Understand risks</div></div><button className="outline-button full" onClick={() => setPage('check')}>Open interaction checker <ArrowRight size={15} /></button></section></div>
  </div>;
}

function StatCard({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: React.ReactNode; tone: string }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
function HistoryRow({ check }: { check: SavedCheck }) { return <div className="history-row"><div className={`risk-pill ${riskTone(check.risk_level)}`}><span />{check.risk_level === 'None' ? 'No conflicts' : `${check.risk_level} risk`}</div><div className="history-meds">{check.medications.join(' · ')}</div><div className="history-meta">{check.interactions.length} {check.interactions.length === 1 ? 'finding' : 'findings'}</div><time>{new Date(check.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></div>; }

function Checker({ user, onSave, onOpenAuth }: { user: User | null; onSave: (medications: string[], interactions: Finding[]) => void; onOpenAuth: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState('');
  const [meds, setMeds] = useState<Medication[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from('medications').select('id, name, category').order('name').then(({ data }) => {
      if (data) setMeds(data as Medication[]);
    });
  }, []);

  const suggestions = meds.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()) && !selected.includes(m.name)).slice(0, 8);

  const runCheck = async () => {
    if (selected.length < 2) return;
    setIsAnalyzing(true);
    setAnalyzeError('');
    try {
      const result = await checkInteractions(selected);
      setFindings(result);
      setHasRun(true);
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Unable to complete the analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const risk = overallRisk(hasRun ? findings : []);
  const pairsPossible = selected.length >= 2 ? (selected.length * (selected.length - 1)) / 2 : 0;

  const addMed = (name: string) => { if (!selected.includes(name)) { setSelected([...selected, name]); setHasRun(false); setFindings([]); } setQuery(''); inputRef.current?.focus(); };
  const removeMed = (name: string) => { setSelected(selected.filter((m) => m !== name)); setHasRun(false); setFindings([]); };

  return <div className="page-wrap checker-page"><div className="page-heading compact"><div><div className="eyebrow">INTERACTION CHECKER</div><h1>Review a medication <em>combination.</em></h1><p>Search {meds.length || 142} medicines and check every pair against the Project SAFE dataset.</p></div><div className="privacy-note"><ShieldCheck size={16} /> Private to your workspace</div></div>
    <div className="checker-layout"><section className="panel input-panel"><div className="panel-heading"><div><span className="panel-kicker">STEP 01 / MEDICATIONS</span><h3>What are you taking?</h3></div><span className="count-badge">{selected.length} selected</span></div><p className="panel-description">Add every prescription, over-the-counter medicine, or supplement you want to review.</p><div className="selected-list">{selected.map((medicine) => <div className="medication-chip" key={medicine}><span className="chip-dot" />{medicine}<button onClick={() => removeMed(medicine)} aria-label={`Remove ${medicine}`}><X size={14} /></button></div>)}{selected.length === 0 && <div className="selected-placeholder"><Plus size={16} /> Your selected medicines will appear here</div>}</div><div className="search-box"><Search size={17} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 142 medicines..." /></div>{query && <div className="suggestions">{suggestions.map((m) => <button key={m.id} onClick={() => addMed(m.name)}><span><strong>{m.name}</strong><small>{m.category ?? 'Medication'}</small></span><Plus size={16} /></button>)}{suggestions.length === 0 && <span className="no-match">No medicines found. Try a different spelling.</span>}</div>}<div className="popular"><span>COMMONLY CHECKED</span>{popularMeds.map((name) => <button key={name} className={selected.includes(name) ? 'selected' : ''} onClick={() => selected.includes(name) ? removeMed(name) : addMed(name)}>{selected.includes(name) && <Check size={13} />}{name}</button>)}</div>{selected.length >= 2 && <div className="pair-info"><Info size={14} /> {pairsPossible} unique {pairsPossible === 1 ? 'pair' : 'pairs'} will be checked</div>}<button className="primary-button full check-button" disabled={selected.length < 2 || isAnalyzing} onClick={runCheck}>{isAnalyzing ? <><Activity className="spin" size={17} /> Analyzing...</> : <><Sparkles size={17} /> Analyze combination <ArrowRight size={16} /></>}</button>{analyzeError && <div className="form-error" style={{ marginTop: '10px' }}><XCircle size={15} />{analyzeError}</div>}<div className="clinical-note"><Info size={15} /><span>This tool supports, but does not replace, advice from a qualified healthcare professional.</span></div></section>
      <section className={`panel result-panel ${hasRun ? 'has-result' : ''}`}>{!hasRun ? <div className="result-empty"><div className="result-orb"><Activity size={28} /></div><h3>Your review will appear here</h3><p>Add at least two medicines, then run the analysis to see pair-by-pair findings and practical context from the dataset.</p><div className="result-legend"><span><i className="legend-dot green" /> No known conflict</span><span><i className="legend-dot amber" /> Review recommended</span><span><i className="legend-dot red" /> Prompt attention</span></div></div> : <div className="result-content"><div className="result-top"><div><span className="panel-kicker">ANALYSIS COMPLETE</span><h3>{risk === 'None' ? 'No known conflicts found' : `${risk} risk requires review`}</h3></div><div className={`overall-badge ${riskTone(risk)}`}>{risk === 'None' ? <Check size={15} /> : <AlertTriangle size={15} />}{risk === 'None' ? 'Clear' : `${risk} risk`}</div></div><div className="result-summary"><div className="summary-number">{findings.length}</div><div><strong>potential {findings.length === 1 ? 'interaction' : 'interactions'}</strong><span>found across {pairsPossible} pairs in {selected.length} medicines</span></div></div>{findings.length ? <div className="finding-list">{findings.map((finding, index) => <div className="finding" key={finding.pair}><button className="finding-header" onClick={() => setOpenDetail(openDetail === index ? null : index)}><span className={`finding-icon ${riskTone(finding.risk)}`}>{finding.risk === 'High' ? <AlertTriangle size={17} /> : <Info size={17} />}</span><span className="finding-copy"><strong>{finding.pair}</strong><small>{finding.title}</small></span><span className={`risk-label ${riskTone(finding.risk)}`}>{finding.risk}</span><ChevronRight size={17} className={openDetail === index ? 'rotate' : ''} /></button>{openDetail === index && <div className="finding-detail"><p>{finding.detail}</p>{finding.mechanism && <div className="detail-block"><strong>Mechanism</strong><span>{finding.mechanism}</span></div>}<div className="detail-block"><strong>Possible effects</strong><span>{finding.possibleEffect || 'Not specified'}</span></div><div className="detail-block"><strong>Recommended action</strong><span>{finding.advice}</span></div></div>}</div>)}</div> : <div className="clear-result"><Check size={20} /><div><strong>No known interactions in this dataset</strong><span>Continue to follow your prescribed instructions.</span></div></div>}<div className="result-actions"><button className="outline-button" onClick={() => { setHasRun(false); setFindings([]); }}>Edit medicines</button><button className="primary-button" onClick={() => onSave(selected, findings)}>{user ? <><ShieldCheck size={16} /> Save review</> : <>Sign in to save <ArrowRight size={15} /></>}</button></div><p className="disclaimer"><AlertTriangle size={13} /> This is an educational reference based on the Project SAFE dataset, not a diagnosis or treatment recommendation.</p></div>}</section></div>
  </div>;
}

function Insights({ checks, setPage }: { checks: SavedCheck[]; setPage: (page: Page) => void }) {
  const findings = checks.flatMap((check) => check.interactions);
  const high = findings.filter((item) => item.risk === 'High').length;
  const moderate = findings.filter((item) => item.risk === 'Moderate').length;
  const medCounts = new Map<string, number>();
  checks.forEach((check) => check.medications.forEach((m) => medCounts.set(m, (medCounts.get(m) ?? 0) + 1)));
  const topMeds = Array.from(medCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return <div className="page-wrap"><div className="page-heading"><div><div className="eyebrow">PERSONAL INSIGHTS</div><h1>Patterns worth <em>noticing.</em></h1><p>A view of the findings across your saved medication reviews.</p></div><button className="primary-button" onClick={() => setPage('check')}><Plus size={17} /> New interaction check</button></div><div className="insight-hero"><div className="insight-score"><div className="score-ring"><strong>{checks.length ? Math.max(0, 100 - high * 12 - moderate * 5) : '—'}{checks.length && <small>%</small>}</strong><span>review confidence</span></div></div><div className="insight-copy"><span className="panel-kicker">YOUR REVIEW SIGNAL</span><h2>{checks.length ? high ? 'Some combinations need attention.' : 'Your current reviews look steady.' : 'Complete a review to unlock insights.'}</h2><p>{checks.length ? 'These signals summarize your saved checks. Always discuss medication changes with a qualified professional.' : 'Insights become more useful as you build a history of checks in your private workspace.'}</p></div></div><div className="insight-grid"><div className="panel metric-panel"><span className="panel-kicker">FINDING MIX</span><h3>Risk distribution</h3><div className="bar-chart"><div className="bar-row"><span>High risk</span><div className="bar-track"><i className="bar high" style={{ width: `${findings.length ? Math.max(8, high / findings.length * 100) : 8}%` }} /></div><strong>{high}</strong></div><div className="bar-row"><span>Moderate</span><div className="bar-track"><i className="bar moderate" style={{ width: `${findings.length ? Math.max(8, moderate / findings.length * 100) : 8}%` }} /></div><strong>{moderate}</strong></div><div className="bar-row"><span>No known conflict</span><div className="bar-track"><i className="bar clear" style={{ width: '32%' }} /></div><strong>{checks.filter((check) => !check.interactions.length).length}</strong></div></div></div><div className="panel metric-panel"><span className="panel-kicker">REFERENCE COVERAGE</span><h3>Most reviewed medicines</h3><div className="coverage-list">{topMeds.length ? topMeds.map(([med, count], index) => <div key={med}><span className="coverage-number">{String(index + 1).padStart(2, '0')}</span><span>{med}</span><small>{count} {count === 1 ? 'review' : 'reviews'}</small></div>) : Array.from({ length: 3 }).map((_, index) => <div key={index}><span className="coverage-number">{String(index + 1).padStart(2, '0')}</span><span>Not enough data</span><small>0 reviews</small></div>)}</div></div></div></div>; }

function Knowledge({ medCount, comboCount, ruleCount }: { medCount: number; comboCount: number; ruleCount: number }) {
  const [query, setQuery] = useState('');
  const filtered = knowledgeArticles.filter((article) => `${article.title} ${article.text} ${article.category}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-wrap"><div className="page-heading"><div><div className="eyebrow">REFERENCE LIBRARY</div><h1>Understand the <em>why.</em></h1><p>Clear, practical context for safer medication conversations.</p></div><div className="library-count"><BookOpen size={17} /><strong>{String(medCount).padStart(3, '0')}</strong> medicines indexed</div></div><div className="knowledge-stats"><div className="kstat"><Database size={16} /><span>{medCount} medications</span></div><div className="kstat"><ShieldCheck size={16} /><span>{comboCount.toLocaleString()} pairs mapped</span></div><div className="kstat"><AlertTriangle size={16} /><span>{ruleCount} interaction rules</span></div></div><div className="knowledge-toolbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the knowledge base..." /></div><span>{filtered.length} articles</span></div><div className="knowledge-grid">{filtered.map((article, index) => <article className="knowledge-card" key={article.title}><div className="article-number">{String(index + 1).padStart(2, '0')}</div><span className="article-category">{article.category}</span><h3>{article.title}</h3><p>{article.text}</p><button>Read article <ArrowRight size={15} /></button></article>)}</div><div className="source-disclaimer"><ShieldCheck size={18} /><div><strong>Project SAFE dataset notice</strong><p>This system references the Project SAFE Drug Interaction Dataset containing {medCount} medications and {ruleCount} known interaction rules across {comboCount.toLocaleString()} pairwise combinations. Confirm findings with an authoritative medicine reference and a qualified healthcare professional before making decisions.</p></div></div></div>; }

function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const result = mode === 'signin' ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    if (result.error) setError(result.error.message);
    else if (mode === 'signup') setMessage('Account created. You can now continue to your workspace.');
    else onClose();
    setLoading(false);
  };
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="auth-modal" onMouseDown={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose}><X size={18} /></button><div className="auth-brand"><div className="brand-mark"><ShieldCheck size={22} /></div><span>MedGuard workspace</span></div><div className="auth-heading"><span className="panel-kicker">SECURE ACCESS</span><h2>{mode === 'signin' ? 'Welcome back.' : 'Create your workspace.'}</h2><p>{mode === 'signin' ? 'Sign in to keep your reviews private and available across sessions.' : 'Save interaction reviews and see your personal insights over time.'}</p></div><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@example.com" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} placeholder="At least 6 characters" /></label>{error && <div className="form-error"><XCircle size={15} />{error}</div>}{message && <div className="form-success"><Check size={15} />{message}</div>}<button className="primary-button full" disabled={loading}>{loading ? <><Activity className="spin" size={16} /> Connecting...</> : mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight size={16} /></button></form><div className="auth-switch">{mode === 'signin' ? 'New to MedGuard?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }}>{mode === 'signin' ? 'Create an account' : 'Sign in instead'}</button></div><p className="auth-footnote"><ShieldCheck size={13} /> Your saved reviews are protected by your account.</p></div></div>;
}

export default App;
