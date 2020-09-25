import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_DETAIL } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo'
import { useRouter } from 'next/router'

const ProductDetail = () => {
    // const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL)
    // console.log('data', data)
    // if (error) return <h1>Error</h1>
    // if (loading) return <h1>Loading...</h1>
    // const product = data
    const router = useRouter()
    // const methodDoesNotExist = () => {
    //     var features = "location=yes, resizeable=yes";
    //     function openNewWindow() {
    //         var newWindow = window.openWindow("https://viblo.asia", "Viblo window", features);
    //     }
    // }
    return (
        <div>
            {router.query.idProduct}
        </div>
    )
}

export default withApollo({ ssr: true })(ProductDetail);