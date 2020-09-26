import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import Button from '../components/ui-kits/Button/Button'
import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCTS } from '../graphql/product/product.query'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Card } from '../components/ui-kits/Card'
import Link from 'next/link'
import Router from 'next/router'

export const HomeContainer = styled.div``

export const StyledHomeBody = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-gap: 10px;
`

function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        page: 1,
        keyword: 'Samsung',
      },
    },
  })
  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>

  const products = data?.getAllProduct?.data
  if (!products || !products.length) {
    return <p>Not found</p>
  }

  return (
    <>
      <Head>
        <title>STRANGS Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        <StyledHomeBody>
          {products.map((data, idx) => (
            <Card
              key={data.id}
              imageURL={data.imgUrl}
              buttonGroups={
                <>
                  <Button onClick={() => Router.push(`/product-detail/${data.id}`)}>View</Button>
                  <Button color="N">
                      Add to Cart
                  </Button>
                  {/* <button onClick={() => {throw new Error}}>Break the world</button>; */}
                </>
              }
            >
              {data.name}
            </Card>
          ))}
        </StyledHomeBody>
      </Layout>
      <Footer />
    </>
  )
}

export default withApollo({ ssr: true })(Home)
