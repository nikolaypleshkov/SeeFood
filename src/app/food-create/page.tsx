import Layout from '@/layout'
import FoodForm from '@/sections/food-form'
import { NextPage } from 'next'
import React from 'react'

const FoodCreatePage: NextPage = () => {
  return (
    <Layout title='Manage Food Items'>
        <FoodForm />
    </Layout>
  )
}

export default FoodCreatePage