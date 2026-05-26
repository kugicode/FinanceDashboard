import { useState } from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const balance = income - expenses;

  const handleAddIncome = () => {
    if(amount <= 0){ return}
    setIncome(income + amount)
    setTransactions([...transactions, {
      id: Date.now(),
      type: "income",
      amount: amount
    }]);
    setAmount(0);
  }

  const handleAddExpense = () => {
    if(amount <= 0 || amount > balance){ return}
    setExpenses(expenses + amount);
    setTransactions([...transactions, {
      id: Date.now(),
      type: "expense",
      amount: amount
    }]);
    setAmount(0);
  }

  const remove = (id) => {
    setTransactions(transactions.filter(item => item.id != id))
  }

  return (
    <div>
      <Navbar />
      <Card title="Total Balance" amount={balance} />
      <Card title="Income" amount={income} />
      <Card title="Expenses" amount={expenses} />
      <input type="number" placeholder='Enter an amount' value={amount} onChange={(e) => setAmount(Number(e.target.value)) } />
      <button onClick={handleAddIncome}>Add income</button>
      <button onClick={handleAddExpense}>Add expense</button>
      
      <ul>
        {transactions.map(item => 
          <li key={item.id}>{item.type} - {item.amount} <button onClick={() => remove(item.id)}>delete</button></li>
        )}
      </ul>
      
    </div>
  )
}

export default App