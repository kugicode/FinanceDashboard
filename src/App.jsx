import { useState } from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [amount, setAmount] = useState(0);

  const balance = income - expenses;

  const click = () => {
    setIncome(income + amount)
    setAmount('');
  }

  const clickExpense = () => {
    setExpenses(expenses + amount);
    setAmount('');

  }

  return (
    <div>
      <Navbar />
      <Card title="Total Balance" amount={balance} />
      <Card title="Income" amount={income} />
      <Card title="Expenses" amount={expenses} />
      <input type="number" placeholder='Enter an amount' value={amount} onChange={(e) => setAmount(Number(e.target.value)) } />
      <button onClick={click}>Add income</button>
      <button onClick={clickExpense}>Add expense</button>
      
    </div>
  )
}

export default App