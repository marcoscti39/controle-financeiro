import React,{useEffect, useState, useContext, useId} from 'react'

const GlobalContext = React.createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
export default function ContextProvider({children}) {
    const transactionsFromLocalStorage = JSON.parse(localStorage.getItem('transactions')) || []

    const [transactions, setTransaction] = useState(transactionsFromLocalStorage)
    const [inputName, setInputName] = useState('')
    const [inputPrice, setInputPrice] = useState('')
    const [totalBalance, setTotalBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [incomes, setIncomes] = useState(0)


    const addTransactions = (e) =>{
        e.preventDefault()

        if(!inputPrice || !inputName){
           return
        }
        setTransaction([...transactions, {name: inputName, price: parseFloat(inputPrice), id: Math.random() }])
        setInputName('')
        setInputPrice("")
    }
    const getFormatedBalance = (number) => {
        const formatedBalance = number.toLocaleString('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        })
        return formatedBalance
    }
    const getTotalBalance = () =>{
        const calcBalance = transactions
            .reduce((acc, transaction) => acc + transaction.price, 0)

        setTotalBalance(getFormatedBalance(calcBalance))
    }
    const getIncomes = () =>{
        const calculateIncomes = transactions.reduce((acc, transaction) =>{
            if(parseInt(transaction.price) > 0){
                return acc + transaction.price
            }
            return acc
        },0)

        setIncomes(getFormatedBalance(calculateIncomes))
    }
    const getExpenses = () =>{
        const calculateExpenses = transactions.reduce((acc, transaction) =>{
            if(parseInt(transaction.price) < 0){
                return acc + parseInt(transaction.price)
            }
            return acc
        },0)
        setExpenses(getFormatedBalance(calculateExpenses))
    }
     const removeTransaction = id =>{
        const newTransactions = transactions.filter(item => item.id !== id)
        setTransaction(newTransactions)
    }

    useEffect(() =>{
        getTotalBalance()
        getIncomes()
        getExpenses()
        localStorage.setItem('transactions', JSON.stringify(transactions))

    }, [transactions])

   
   
    return (
        <GlobalContext.Provider
         value={{
            transactions,
            setTransaction,
            inputName,
            setInputName,
            inputPrice,
            setInputPrice,
            addTransactions,
            removeTransaction,
            totalBalance,
            expenses,
            incomes,
            getFormatedBalance
         }}>
             {children}
         </GlobalContext.Provider>
    )
}
