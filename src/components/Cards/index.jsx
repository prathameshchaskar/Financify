import React from 'react'
import "./styles.css"
import { Card, Row } from 'antd'
import { Button } from '../Button'

export const Cards = ({showIncomeModal, showExpenseModal}) => {
  return (
    <div> 
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance">
                <p> $1000.00 </p>
                <Button text="Reset Balance" blue={true} />
            </Card>
            <Card className='my-card' title="Total Income">
                <p> $1000.00 </p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card>
            <Card className='my-card' title="Total Expenses">
                <p> $1000.00 </p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

