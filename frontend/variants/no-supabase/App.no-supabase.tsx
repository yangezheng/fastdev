import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/lib/api"

function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = async () => {
    setLoading(true)
    try {
      const { data } = await api.post("/api/calculate", { input })
      setResult(data.result)
    } catch (err) {
      alert("Failed to calculate.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-center">FastDev Calculator</h2>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a number"
        />
        <Button onClick={calculate} disabled={loading}>
          {loading ? "Calculating..." : "Submit"}
        </Button>

        {result !== null && (
          <CardContent>
            <p>Result: <strong>{result}</strong></p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default App