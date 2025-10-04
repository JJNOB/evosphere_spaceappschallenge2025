import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingUp, BarChart3, Download, Wrench } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ResearchResult } from "@/types/research";
import styles from './ResultsTabs.module.css';

interface ResultsTabsProps {
  result: ResearchResult | null;
}

export const ResultsTabs = ({ result }: ResultsTabsProps) => {
  const hasResults = result && result.sources.length > 0;

  // Determine which tabs to show based on available content
  const hasFindings = result?.keyFindings;
  const hasUncertainties = result?.uncertaintiesAndConflicts;
  const hasTechnology = result?.technologyAndOperationalImplications;
  const hasLimitations = result?.technologyLimitations;
  const hasEngineering = result?.engineeringAndSystemsIntegration;

  const handleDownloadCSV = () => {
    if (!result) return;
    
    const csv = [
      ['Title', 'URL'],
      ...result.sources.map(s => [s.title, s.url])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-sources.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className={styles.section}>
      <Tabs defaultValue="summary" className={styles.tabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="summary" className={styles.tabTrigger}>
            Summary
          </TabsTrigger>
          {hasFindings && (
            <TabsTrigger 
              value="findings" 
              className={styles.tabTrigger}
            >
              Key Findings
            </TabsTrigger>
          )}
          {hasUncertainties && (
            <TabsTrigger 
              value="uncertainties" 
              className={styles.tabTrigger}
            >
              Uncertainties
            </TabsTrigger>
          )}
          {hasTechnology && (
            <TabsTrigger 
              value="technology" 
              className={styles.tabTrigger}
            >
              Technology
            </TabsTrigger>
          )}
          {hasLimitations && (
            <TabsTrigger 
              value="limitations" 
              className={styles.tabTrigger}
            >
              Limitations
            </TabsTrigger>
          )}
          <TabsTrigger 
            value="sources" 
            disabled={!hasResults}
            className={styles.tabTrigger}
          >
            Sources
          </TabsTrigger>
          {hasEngineering && (
            <TabsTrigger 
              value="engineering" 
              className={styles.tabTrigger}
            >
              Engineering
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="summary" className={styles.tabContent}>
          <Card className={styles.card}>
            <div className={styles.cardInner}>
              <div className={`${styles.icon} ${hasResults ? styles.iconPrimary : styles.iconWarning}`}>
                <FileText className={styles.iconSize} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.heading}>
                  {hasResults ? "General Scope" : "No Information Found"}
                </h3>
                {result ? (
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.summary}</ReactMarkdown>
                  </div>
                ) : (
                  <p className={styles.placeholder}>
                    Enter a query above to get AI-powered summaries of NASA bioscience research. 
                    Our system analyzes publications to provide comprehensive insights 
                    into space biology experiments and their implications for human exploration.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {hasFindings && (
          <TabsContent value="findings" className={styles.tabContent}>
            <Card className={styles.card}>
              <div className={styles.cardInner}>
                <div className={`${styles.icon} ${styles.iconSuccess}`}>
                  <TrendingUp className={styles.iconSize} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Key Findings & Conclusions</h3>
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.keyFindings}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
        
        {hasUncertainties && (
          <TabsContent value="uncertainties" className={styles.tabContent}>
            <Card className={styles.card}>
              <div className={styles.cardInner}>
                <div className={`${styles.icon} ${styles.iconWarning}`}>
                  <BarChart3 className={styles.iconSize} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Uncertainties & Conflicts</h3>
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.uncertaintiesAndConflicts!}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
        
        {hasTechnology && (
          <TabsContent value="technology" className={styles.tabContent}>
            <Card className={styles.card}>
              <div className={styles.cardInner}>
                <div className={`${styles.icon} ${styles.iconInfo}`}>
                  <Wrench className={styles.iconSize} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Technology & Operational Implications</h3>
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.technologyAndOperationalImplications!}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
        
        {hasLimitations && (
          <TabsContent value="limitations" className={styles.tabContent}>
            <Card className={styles.card}>
              <div className={styles.cardInner}>
                <div className={`${styles.icon} ${styles.iconWarning}`}>
                  <BarChart3 className={styles.iconSize} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Technology Limitations</h3>
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.technologyLimitations!}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
        
        <TabsContent value="sources" className={styles.tabContent}>
          <Card className={styles.card}>
            <div className={styles.cardInner}>
              <div className={`${styles.icon} ${styles.iconInfo}`}>
                <FileText className={styles.iconSize} />
              </div>
              <div className={styles.content}>
                <div className={styles.sourcesHeader}>
                  <h3 className={styles.heading}>Sources & Data Access</h3>
                  {hasResults && (
                    <Button
                      onClick={handleDownloadCSV}
                      className={styles.downloadButton}
                      variant="outline"
                    >
                      <Download className={styles.downloadIcon} />
                      Download CSV
                    </Button>
                  )}
                </div>
                {result ? (
                  <>
                    {hasResults && (
                      <div className={styles.sourcesList}>
                        {result.sources.map((source, i) => (
                          <div key={i} className={styles.sourceItem}>
                            <div className={styles.sourceHeader}>
                              <h4 className={styles.sourceTitle}>{source.title}</h4>
                              <span className={styles.sourceAuthors}>
                                {source.authors} ({source.year})
                              </span>
                            </div>
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles.sourceLink}
                            >
                              {source.url}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className={styles.placeholder}>
                    View core papers, datasets, and links to primary data sources.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        {hasEngineering && (
          <TabsContent value="engineering" className={styles.tabContent}>
            <Card className={styles.card}>
              <div className={styles.cardInner}>
                <div className={`${styles.icon} ${styles.iconSuccess}`}>
                  <Wrench className={styles.iconSize} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Engineering & Systems Integration</h3>
                  <div className={styles.prose}>
                    <ReactMarkdown>{result.engineeringAndSystemsIntegration!}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
};
