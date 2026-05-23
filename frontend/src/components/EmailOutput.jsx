import { Copy, RefreshCw } from 'lucide-react';

const EmailOutput = ({ generated, copyToClipboard, setGenerated }) => {
  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <h2 className="text-2xl font-semibold mb-6">Generated Email</h2>

      {generated ? (
        <div className="space-y-6">
          <div>
            <p className="uppercase text-xs text-gray-500 mb-2">Subject</p>
            <div className="bg-gray-100 p-5 rounded-2xl flex justify-between items-start">
              <p className="font-medium text-lg">{generated.subject}</p>
              <button onClick={() => copyToClipboard(generated.subject, "Subject")}>
                <Copy size={22} className="text-blue-600" />
              </button>
            </div>
          </div>

          <div>
            <p className="uppercase text-xs text-gray-500 mb-2">Email Body</p>
            <div className="bg-gray-100 p-6 rounded-2xl whitespace-pre-wrap leading-relaxed min-h-[300px]">
              {generated.body}
            </div>
            <button
              onClick={() => copyToClipboard(generated.body, "Email Body")}
              className="mt-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <Copy size={18} /> Copy Full Message
            </button>
          </div>

          <button
            onClick={() => setGenerated(null)}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-3 border rounded-2xl"
          >
            <RefreshCw size={18} /> Generate Another Email
          </button>
        </div>
      ) : (
        <div className="h-100 flex items-center justify-center text-center text-gray-400">
          Fill the form and click "Generate Email with AI"
        </div>
      )}
    </div>
  );
}

export default EmailOutput;