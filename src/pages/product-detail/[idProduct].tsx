import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_DETAIL } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo'
import { useRouter } from 'next/router'

const ProductDetail = () => {
    const router = useRouter()
    const { idProduct } = router.query;

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
        variables: {
            input: {
                id: idProduct,
            },
        },
    })

    console.log(loading, error, data)
    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>  

    const products = data?.getProductDetail
    if (!(products && products.id)) {
      return <p>Not found</p>
    }
  
    console.log(products)
  
    return (
        <div>
            {router.query.idProduct}
            <div dangerouslySetInnerHTML={{ __html: products.description }} />
        </div>
    )
}

export default withApollo({ ssr: true })(ProductDetail);