import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AdminAILogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    // Joining with profiles to get user email
    const { data, error } = await supabase
      .from('generation_logs')
      .select(`
        *,
        profiles (
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (!error) {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-lg text-on-surface">AI Generation Logs</h2>
        <p className="font-body-base text-on-surface-variant">Monitor system usage and prevent abuse.</p>
      </div>

      <div className="bg-surface-container-highest/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">User</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Prompt & Output</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Processing</th>
                <th className="px-6 py-4 font-title-md text-xs text-on-surface-variant uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-on-surface-variant">Loading logs...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-on-surface-variant">No logs available.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors align-top">
                    <td className="px-6 py-4">
                      <span className="font-title-md text-sm text-on-surface">{log.profiles?.email || 'Unknown'}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xl">
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Prompt</p>
                          <p className="text-sm text-on-surface bg-black/30 p-3 rounded-lg border border-white/5 line-clamp-3 hover:line-clamp-none transition-all">
                            {log.prompt}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-1">Output</p>
                          <p className="text-sm text-on-surface-variant bg-white/5 p-3 rounded-lg border border-white/5 line-clamp-2 hover:line-clamp-none transition-all italic">
                            {log.output}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-tertiary">
                        {log.processing_time_ms ? `${log.processing_time_ms}ms` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-on-surface-variant">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAILogs;
