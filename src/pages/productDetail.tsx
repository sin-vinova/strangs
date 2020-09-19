import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_DETAIL } from '../graphql/product/product.query';
import withApollo from '../utils/withApollo'

const ProductDetail = () => {
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL)
    console.log('data', data)
    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>
    const product = data
    return (
        <div>
            asass
        </div>
    )
}

export default withApollo({ ssr: true })(ProductDetail);