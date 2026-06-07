import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [load, setLoad] = useState(false);

  const filteredIncome = transactions.filter(item => item.type === "income");

  const totalIncome = filteredIncome.reduce((acc, cur) => acc + cur.amount, 0);

  const filteredExpenses = transactions.filter(item => item.type === "expense");

  const totalExpenses = filteredExpenses.reduce((acc, cur) => acc + cur.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleAddIncome = () => {
    if(amount <= 0){ return}
    setTransactions([...transactions, {
      id: Date.now(),
      type: "income",
      amount: amount,
      date: new Date().toLocaleDateString()
    }]);
    setAmount(0);
  }

  const handleAddExpense = () => {
    if(amount <= 0 || amount > balance){ return}
    setTransactions([...transactions, {
      id: Date.now(),
      type: "expense",
      amount: amount,
      date: new Date().toLocaleDateString()
    }]);
    setAmount(0);
  }

  const remove = (id) => {
    setTransactions(transactions.filter(item => item.id !== id));
  }

  const clear = () => {
    if (confirm("Are you sure?")){    
  setTransactions([]);
    }
  }

  useEffect(() => {
  const savedItem = JSON.parse(localStorage.getItem('transaction'));
  if(savedItem){
  setTransactions(savedItem);
    }
    setLoad(true);
  },[]);

    useEffect(() => {
      if(load){
    localStorage.setItem('transaction', JSON.stringify(transactions));
      }
  },[transactions, load]);

  useEffect(() => {
    const savedAmount = JSON.parse(localStorage.getItem('amount'));
    if(savedAmount){
    setAmount(savedAmount);
    }
  },[])

   useEffect(() => {
    localStorage.setItem('amount', JSON.stringify(amount));
  },[amount])

  return (
    <div>
      <Navbar />
      <Card title="Total Balance" amount={balance} />
      <Card title="Income" amount={totalIncome} />
      <Card title="Expenses" amount={totalExpenses} />
      <input type="number" placeholder='Enter an amount' value={amount} onChange={(e) => setAmount(Number(e.target.value)) } />
      <button onClick={handleAddIncome}>Add income</button>
      <button onClick={handleAddExpense}>Add expense</button>
      
      <ul>
        
        {transactions.length > 0 
        ?  
        transactions.map((item, index) => 
         <li style={item.type === 'income' ? {color:'green'} : {color:'red'}} 
        key={item.id}>{index + 1}. {item.type} - {item.amount} {item.date}
        <button onClick={() => remove(item.id)}>delete</button></li>
        )
      : <li>No transactions here!</li>
      }
      </ul>

      <p>Transactions: {transactions.length}</p>
      <p>Income: {transactions.filter(item => item.type === 'income').length}</p>
      <p>Expenses: {transactions.filter(item => item.type === 'expense').length}</p>
      <p>Total money moved: {totalIncome + totalExpenses}</p>
      <button onClick={clear}>Clear All</button>
    </div>
  )
}

export default App