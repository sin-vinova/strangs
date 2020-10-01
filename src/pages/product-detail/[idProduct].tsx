import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_DETAIL } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo'
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Slider from 'react-slick'
import { Header } from '../../components/Header'
import Layout from '../../components/Layout/Layout'


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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const { images, name, finalPrice, price, promotionPercent } = products

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    return (
        <Wrapper>
            <Header />
            <Layout>
                <Container>
                    <Title>
                        Product Detail
                    </Title>
                    <ProductContainer>
                        <ImageContainer>
                            <Slider {...settings}>
                                {images.map((img, idx) => (
                                    <div key={idx}>
                                        <Image src={`https://media3.scdn.vn/${img}`} />
                                    </div>
                                ))}
                            </Slider>
                        </ImageContainer>
                        <DetailContainer>
                            <Name>{name}</Name>
                            <Price>
                                <FinalPrice>
                                    {finalPrice}
                                </FinalPrice>
                                {promotionPercent >= 0 &&
                                    <>
                                        <OriginPrice>
                                            {price}
                                        </OriginPrice>
                                        <PromotionPercent>
                                            {promotionPercent}% Off
                                        </PromotionPercent>
                                    </>
                                }
                            </Price>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </DetailContainer>
                    </ProductContainer>
                    <div dangerouslySetInnerHTML={{ __html: products.description }} />
                </Container>
            </Layout>
        </Wrapper>
    )
}

export default withApollo({ ssr: true })(ProductDetail);

const Wrapper = styled.section`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

const Container = styled.div`
    width: 60%;
    margin: 50px auto 0;
`;

const Title = styled.h3`
    margin-bottom: 50px;
`

const ProductContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    /* border: 1px solid #9b59b6; */
    border-radius: 15px;
    box-shadow: 0 0 5px 1px #9b59b6;
`

const ImageContainer = styled.div`
    width: 50%;
    padding: 10px 25px 20px;
`
const Image = styled.img`
    max-width: 100%;
`;

const DetailContainer = styled.div`
    width: 50%;
    padding-left: 5px;
`;

const Name = styled.div`
    margin-bottom: 5px;
`
const Price = styled.div`
    display: flex;
    align-items: center;
`
const FinalPrice = styled.div`
    color: #e74c3c;
    font-size: 24px;
    margin-right: 5px;
`
const OriginPrice = styled.div`
    font-size: 18px;
    margin-right: 5px;
    text-decoration: line-through;
`
const PromotionPercent = styled.div`
    font-size: 18px;
    color: #1abc9c;
`