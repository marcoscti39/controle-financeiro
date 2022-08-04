import React from 'react'
import Transaction from '../components/transaction'
import { useGlobalContext } from '../context'

export default function Home() {
    const {
            transactions, 
            inputPrice,
            inputName,
            setInputName,
            setInputPrice,
            addTransactions,
            totalBalance,
            expenses,
            incomes

        } = useGlobalContext() 

        
    return (
        <main>
            <h1 className='title'>controle de despesas</h1>
            <section className="financial-controler">
                <div className="financial-total-amount">
                    <span className="total-amount-text">saldo atual</span>
                    <div className="total-amount-value">{totalBalance}</div>
                </div>

                <div className="financial-board">
                    <div className="incomes">
                        <span className="incomes-text">receitas</span>
                        <div className="incomes-value">{incomes}</div>

                    </div>
                    <div className="expenses">
                        <span className="expenses-text">despesas</span>
                        <div className="expenses-value">{expenses}</div>

                    </div>
                </div>

                <section className='transactions-container'>
                    <h2 className="transactions-title">transações</h2>
                    {transactions?.map((item, index) =>{
                        return (
                            <Transaction key={index} {...item}/>
                        )
                    })}
                    

                </section>

                <form onSubmit={(e) => addTransactions(e)} className="transactions-add">
                    <h2>adicionar transação</h2>
                    <label className="label-name">
                        <p className="label-name-text">nome</p>
                        <input 
                            className="input-name" 
                            onInput={(e) => setInputName(e.target.value)} 
                            type="text" 
                            value={inputName} 
                            placeholder="nome da transação" />
                    </label>

                    <label htmlFor="" className="label-value">
                        <p className="label-value-text">valor</p>

                        <span className="label-value-info">
                            negativo = despesas, positivo = receitas
                        </span>

                        <input  
                            className="input-value" 
                            onInput={(e) =>setInputPrice(e.target.value)}
                            type="number" 
                            step="0.01"
                            value={inputPrice} 
                            placeholder="valor da transação"/>

                    </label>
                    <button className="submit-btn" type="submit">adicionar</button>
                </form>
            </section>
            
        </main>
    )
}
