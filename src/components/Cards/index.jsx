import React from 'react'
import "./styles.css"
import { Card, Row } from 'antd'
import { Button } from '../Button'

export const Cards = ({
    income,expense, totalBalance,
    showIncomeModal, showExpenseModal}) => {
  return (
    <div> 
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance">
                <p> {totalBalance} </p>
                <Button text="Reset Balance" blue={true} />
            </Card>
            <Card className='my-card' title="Total Income">
                <p> {income} </p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card>
            <Card className='my-card' title="Total Expenses">
                <p> {expense} </p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

