import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Cpu, 
  FileCode, 
  Terminal, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Play, 
  Sparkles, 
  Layers, 
  RotateCw,
  Info,
  DollarSign,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import axios from 'axios';
import './App.css';

// Client side prompt info (for user preview / explanation)
const PRESET_INFO = {
  general: {
    name: 'General Description',
    icon: ImageIcon,
    desc: 'Analyzes visual content, objects, text, color theme, and context.',
  },
  ocr: {
    name: 'Document OCR',
    icon: FileText,
    desc: 'Transcribes paragraphs, titles, and text strings verbatim.',
  },
  uiux: {
    name: 'UI/UX Analysis',
    icon: Layers,
    desc: 'Audits user layouts, visual palette, readability, and issues.',
  },
  objects: {
    name: 'Object Detection',
    icon: Cpu,
    desc: 'Counts, labels, and localizes coordinates of individual items.',
  },
  receipt: {
    name: 'Receipt Parser',
    icon: FileSpreadsheet,
    desc: 'Parses totals, taxes, transaction line items, and merchant.',
  }
};

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [preset, setPreset] = useState('general');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  // Pipeline status tracking
  const [loading, setLoading] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState({
    1: 'idle', // Receive Image
    2: 'idle', // Check Image
    3: 'idle', // Build AI Prompt
    4: 'idle', // Send to Gemini Vision
    5: 'idle', // Parse JSON Output
    6: 'idle', // Done
  });
  
  const [activeTab, setActiveTab] = useState('pretty_json');
  const [responseJson, setResponseJson] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef(null);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Invalid file format. Please upload JPEG, PNG, WEBP, or GIF.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image is too large. Maximum size allowed is 5MB.');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setResponseJson(null);
    setErrorMsg('');
    resetPipeline();
  };

  const resetPipeline = () => {
    setPipelineSteps({
      1: 'idle',
      2: 'idle',
      3: 'idle',
      4: 'idle',
      5: 'idle',
      6: 'idle',
    });
  };

  const runAnalysis = async () => {
    if (!imageFile) {
      setErrorMsg('Please upload an image first.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResponseJson(null);
    
    // Helper to sleep for simulation steps
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // Step 1: Receive Image
      setPipelineSteps(prev => ({ ...prev, 1: 'running' }));
      await sleep(600);
      setPipelineSteps(prev => ({ ...prev, 1: 'success' }));

      // Step 2: Check Image details (dimensions, type)
      setPipelineSteps(prev => ({ ...prev, 2: 'running' }));
      await sleep(650);
      setPipelineSteps(prev => ({ ...prev, 2: 'success' }));

      // Step 3: Build AI prompt template
      setPipelineSteps(prev => ({ ...prev, 3: 'running' }));
      await sleep(500);
      setPipelineSteps(prev => ({ ...prev, 3: 'success' }));

      // Step 4: Send to Gemini Vision
      setPipelineSteps(prev => ({ ...prev, 4: 'running' }));
      
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('preset', preset);
      formData.append('customPrompt', customPrompt);

      // Call Express Backend API (default on port 5000)
      const res = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPipelineSteps(prev => ({ ...prev, 4: 'success' }));

      // Step 5: Convert into clean JSON
      setPipelineSteps(prev => ({ ...prev, 5: 'running' }));
      await sleep(600);
      
      if (res.data && res.data.data) {
        setResponseJson(res.data.data);
        setPipelineSteps(prev => ({ ...prev, 5: 'success' }));
        
        // Step 6: Done
        setPipelineSteps(prev => ({ ...prev, 6: 'success' }));
      } else {
        throw new Error('Server returned an empty or malformed payload');
      }

    } catch (err) {
      console.error(err);
      
      // Locate which step was active and mark it as failed
      setPipelineSteps(prev => {
        const nextState = { ...prev };
        let marked = false;
        for (let i = 1; i <= 6; i++) {
          if (nextState[i] === 'running') {
            nextState[i] = 'failed';
            marked = true;
            break;
          }
        }
        if (!marked) {
          nextState[4] = 'failed'; // Default to API failed
        }
        return nextState;
      });

      const backendError = err.response?.data?.error || err.message || 'Server error';
      setErrorMsg(`Analysis failed: ${backendError}`);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <RotateCw className="animate-spin text-purple-400" size={16} />;
      case 'success':
        return <CheckCircle2 className="text-emerald-500" size={16} />;
      case 'failed':
        return <AlertCircle className="text-rose-500" size={16} />;
      default:
        return <div className="w-4 h-4 rounded-full border border-gray-600"></div>;
    }
  };

  // Helper to render visually aesthetic summary representations of the JSON
  const renderVisualSummary = () => {
    if (!responseJson) return null;

    switch (preset) {
      case 'general':
        return (
          <div className="summary-visualizer">
            <div className="summary-heading">Image Overview</div>
            <div className="summary-grid">
              <div className="summary-section">
                <div className="summary-sec-title">Summary Description</div>
                <div className="summary-sec-value">{responseJson.summary}</div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Estimated Setting & Context</div>
                <div className="summary-sec-value">{responseJson.context}</div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Detected Key Elements</div>
                <div className="tag-list">
                  {responseJson.objects?.map((obj, i) => (
                    <span key={i} className="tag">{obj}</span>
                  ))}
                </div>
              </div>
              {responseJson.visualStyle && (
                <div className="summary-section">
                  <div className="summary-sec-title">Aesthetic theme</div>
                  <div className="summary-sec-value" style={{ textTransform: 'capitalize' }}>
                    {responseJson.visualStyle.theme} Theme
                  </div>
                  <div className="tag-list" style={{ marginTop: '8px' }}>
                    {responseJson.visualStyle.dominantColors?.map((color, i) => (
                      <span key={i} className="tag tag-purple">{color}</span>
                    ))}
                  </div>
                </div>
              )}
              {responseJson.detectedText && responseJson.detectedText.length > 0 && (
                <div className="summary-section">
                  <div className="summary-sec-title">Embedded Text Segments</div>
                  <div className="summary-sec-value">
                    <ul style={{ margin: '5px 0 0 15px', padding: 0 }}>
                      {responseJson.detectedText.map((text, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>"{text}"</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'ocr':
        return (
          <div className="summary-visualizer">
            <div className="summary-heading">Transcribed Text Document</div>
            <div className="summary-grid">
              <div className="summary-section">
                <div className="summary-sec-title">Document Structure Metadata</div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px' }}>
                  <div>Type: <strong style={{ color: '#fff' }}>{responseJson.documentType}</strong></div>
                  <div>Language: <strong style={{ color: '#fff' }}>{responseJson.detectedLanguage}</strong></div>
                </div>
              </div>
              {responseJson.title && (
                <div className="summary-section">
                  <div className="summary-sec-title">Main Header / Title</div>
                  <h3 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>{responseJson.title}</h3>
                </div>
              )}
              <div className="summary-section">
                <div className="summary-sec-title">Extracted Paragraphs</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {responseJson.paragraphs?.map((para, i) => (
                    <p key={i} style={{ fontSize: '14px', lineHeight: '1.5', color: '#d0d2e0' }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'uiux':
        return (
          <div className="summary-visualizer">
            <div className="summary-heading">UX Audit Report</div>
            <div className="summary-grid">
              <div className="summary-section">
                <div className="summary-sec-title">Screen Category</div>
                <div className="summary-sec-value">{responseJson.screenName}</div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Visual Styling Hexes</div>
                <div className="tag-list">
                  {responseJson.colorPalette?.map((color, i) => (
                    <span key={i} className="tag" style={{ borderLeft: `4px solid ${color}` }}>{color}</span>
                  ))}
                </div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Usability Accessibility Issues</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '5px' }}>
                  {responseJson.usabilityIssues?.map((issueObj, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13.5px' }}>
                      <AlertTriangle className="text-rose-400" size={16} style={{ flexShrink: 0 }} />
                      <div>
                        <strong>[{issueObj.severity}]</strong> {issueObj.issue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Design Recommendations</div>
                <ul style={{ margin: '5px 0 0 15px', padding: 0 }}>
                  {responseJson.suggestions?.map((sug, i) => (
                    <li key={i} style={{ fontSize: '13.5px', marginBottom: '5px', color: '#d0d2e0' }}>{sug}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'objects':
        return (
          <div className="summary-visualizer">
            <div className="summary-heading">Objects Found ({responseJson.objectsCount})</div>
            <div className="summary-grid">
              <div className="summary-section">
                <div className="summary-sec-title">Detections List</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {responseJson.detections?.map((det, i) => (
                    <div key={i} className="item-list-row">
                      <span style={{ fontWeight: '500', color: '#fff' }}>{det.label}</span>
                      <span className="tag tag-purple">Grid Box: ({det.boundingBox?.x}, {det.boundingBox?.y}) {det.boundingBox?.width}x{det.boundingBox?.height}</span>
                      <span className="tag tag-emerald">{det.confidence} Confidence</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'receipt':
        return (
          <div className="summary-visualizer">
            <div className="summary-heading">Receipt Transaction Summary</div>
            <div className="summary-grid">
              <div className="summary-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="summary-sec-title">Merchant / Store</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{responseJson.merchant}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="summary-sec-title">Date</div>
                  <div style={{ fontSize: '14px' }}>{responseJson.date}</div>
                </div>
              </div>
              <div className="summary-section">
                <div className="summary-sec-title">Line Items</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {responseJson.items?.map((item, i) => (
                    <div key={i} className="item-list-row">
                      <span>{item.name} (x{item.quantity})</span>
                      <strong style={{ color: '#fff' }}>{responseJson.currency} {item.price?.toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="summary-section" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <div className="summary-sec-title" style={{ color: 'var(--accent-emerald)' }}>Financial Summary</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                  <div className="item-list-row">
                    <span>Tax Amount:</span>
                    <span>{responseJson.currency} {responseJson.tax?.toFixed(2)}</span>
                  </div>
                  <div className="item-list-row" style={{ borderBottom: 'none', fontSize: '16px', fontWeight: 'bold' }}>
                    <span style={{ color: '#fff' }}>TOTAL COST:</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>{responseJson.currency} {responseJson.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4">No summary visualizer is configured for this template.</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand">
          <Sparkles className="logo-icon" size={32} />
          <h1>Mira AI</h1>
          <span>Vision API Playground</span>
        </div>
        <div className="header-links">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub Repository
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="dashboard-grid">
        
        {/* Left Side: Setup & Input Panel */}
        <section className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="panel-title">
            <UploadCloud size={20} />
            <h2>Image Setup</h2>
          </div>

          {/* Upload Zone */}
          {!imagePreview ? (
            <div 
              className={`dropzone ${isDragging ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <UploadCloud className="dropzone-icon" size={48} />
              <div className="dropzone-text">
                <h3>Drag & Drop your image here</h3>
                <p>Supports PNG, JPEG, WEBP, and GIF (Max 5MB)</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                accept="image/*"
              />
            </div>
          ) : (
            <div className="preview-container">
              <img src={imagePreview} className="preview-image" alt="Upload preview" />
              <div className="preview-overlay">
                <button className="action-btn-circle" onClick={clearImage} title="Clear Image">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Preset Selectors */}
          <div>
            <label className="section-label">Select Analysis Objective</label>
            <div className="presets-grid">
              {Object.entries(PRESET_INFO).map(([key, info]) => {
                const IconComponent = info.icon;
                return (
                  <div 
                    key={key} 
                    className={`preset-card ${preset === key ? 'active' : ''}`}
                    onClick={() => setPreset(key)}
                  >
                    <IconComponent className="preset-icon" size={20} />
                    <div className="preset-name">{info.name}</div>
                    <div className="preset-desc">{info.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Prompt Input */}
          <div className="custom-prompt-container">
            <label className="section-label">Custom Instruction Override (Optional)</label>
            <textarea 
              className="prompt-textarea"
              placeholder="e.g. Focus on finding handwritten text, list specific colors, or ignore logo items..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>

          {/* Action Row */}
          <div className="actions-row">
            <button 
              className="btn-primary" 
              onClick={runAnalysis}
              disabled={loading || !imageFile}
            >
              {loading ? (
                <>
                  <RotateCw className="animate-spin" size={18} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>Execute Analysis</span>
                </>
              )}
            </button>
          </div>
          
          {errorMsg && (
            <div style={{ display: 'flex', gap: '10px', background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '12px', borderRadius: '8px', color: 'var(--accent-rose)', fontSize: '13.5px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{errorMsg}</div>
            </div>
          )}
        </section>

        {/* Right Side: Process Pipeline Tracker & JSON Result */}
        <section className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="panel-title">
            <Terminal size={20} />
            <h2>Pipeline & Output Console</h2>
          </div>

          {/* Pipeline Tracker */}
          <div className="pipeline-visualizer">
            <div className="pipeline-step-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>PIPELINE SEQUENCE STATUS</span>
              <span>SIMULATOR</span>
            </div>
            
            <div className={`pipeline-step ${pipelineSteps[1] === 'running' ? 'active' : pipelineSteps[1] === 'success' ? 'completed' : pipelineSteps[1] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">1</div>
                <div className="step-label">Receive Image</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[1].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[1])}
              </div>
            </div>

            <div className={`pipeline-step ${pipelineSteps[2] === 'running' ? 'active' : pipelineSteps[2] === 'success' ? 'completed' : pipelineSteps[2] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">2</div>
                <div className="step-label">Validate Image Mime/Size</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[2].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[2])}
              </div>
            </div>

            <div className={`pipeline-step ${pipelineSteps[3] === 'running' ? 'active' : pipelineSteps[3] === 'success' ? 'completed' : pipelineSteps[3] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">3</div>
                <div className="step-label">Compile Prompt Template</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[3].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[3])}
              </div>
            </div>

            <div className={`pipeline-step ${pipelineSteps[4] === 'running' ? 'active' : pipelineSteps[4] === 'success' ? 'completed' : pipelineSteps[4] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">4</div>
                <div className="step-label">Invoke Gemini Vision API</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[4].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[4])}
              </div>
            </div>

            <div className={`pipeline-step ${pipelineSteps[5] === 'running' ? 'active' : pipelineSteps[5] === 'success' ? 'completed' : pipelineSteps[5] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">5</div>
                <div className="step-label">Sanitize & Clean JSON Schema</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[5].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[5])}
              </div>
            </div>

            <div className={`pipeline-step ${pipelineSteps[6] === 'running' ? 'active' : pipelineSteps[6] === 'success' ? 'completed' : pipelineSteps[6] === 'failed' ? 'failed' : ''}`}>
              <div className="step-info">
                <div className="step-number">6</div>
                <div className="step-label">Return Parsed Dataset</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="step-badge">{pipelineSteps[6].toUpperCase()}</span>
                {getStepStatusIcon(pipelineSteps[6])}
              </div>
            </div>
          </div>

          {/* Results Console */}
          <div>
            <div className="results-tabs">
              <button 
                className={`tab-btn ${activeTab === 'pretty_json' ? 'active' : ''}`}
                onClick={() => setActiveTab('pretty_json')}
              >
                <FileCode size={16} />
                Structured JSON
              </button>
              <button 
                className={`tab-btn ${activeTab === 'visual_summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('visual_summary')}
                disabled={!responseJson}
              >
                <Sparkles size={16} />
                Visual Report
              </button>
            </div>

            <div className="results-content">
              {responseJson ? (
                activeTab === 'pretty_json' ? (
                  <pre className="json-viewer-container">
                    <code>{JSON.stringify(responseJson, null, 2)}</code>
                  </pre>
                ) : (
                  renderVisualSummary()
                )
              ) : (
                <div className="standby-state">
                  <Terminal size={40} />
                  <h3>Console Idle</h3>
                  <p>Load an image and click "Execute Analysis" to trigger output pipelines.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Mira AI. Powered by Google Gemini 2.5 Flash Vision Models.</p>
      </footer>
    </div>
  );
}

export default App;
