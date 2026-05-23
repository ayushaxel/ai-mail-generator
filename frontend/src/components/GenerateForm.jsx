import { Loader2 } from 'lucide-react';

const  GenerateForm= ({ formData, setFormData, generateEmail, loading })=> {
  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <h2 className="text-2xl font-semibold mb-6">Generate New Email</h2>

      <form onSubmit={generateEmail} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Purpose of Email</label>
          <input
            type="text"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full p-4 border rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="e.g. Internship Request, Leave Application"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Points (one per line)</label>
          <textarea
            value={formData.keyPoints}
            onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
            rows={6}
            className="w-full p-4 border rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="I am a MERN stack developer\nHave 1 year experience"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
            className="w-full p-4 border rounded-2xl focus:outline-none focus:border-blue-500"
          >
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Formal">Formal</option>
            <option value="Polite">Polite</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : 'Generate Email with AI'}
        </button>
      </form>
    </div>
  );
}

export default GenerateForm;