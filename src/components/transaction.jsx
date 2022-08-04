import React,{useState} from 'react'
import {IoMdClose} from 'react-icons/io'
import { useGlobalContext } from '../context'

export default function Transaction({name, price, id}) {
    const [isRemoveBtnOn, setIsRemoveBtnOn] = useState(false)
    const {removeTransaction, getFormatedBalance} = useGlobalContext()

    const isIncome = parseInt(price) > 0 ? true : false

    return (
        <article className={`transaction ${isIncome ? "income": "expense"}`} 
            onMouseOver={() => setIsRemoveBtnOn(true)}
            onMouseLeave={() => setIsRemoveBtnOn(false)} >

            <p className="transaction-name">{name}</p>
            <strong className="transaction-price">{getFormatedBalance(price)}</strong>
            <button className={`transaction-remove ${isRemoveBtnOn && 'show-remove-btn'}`}
                    onClick={() => removeTransaction(id)}>
                <IoMdClose/>
            </button>
            
        </article>
    )
}
