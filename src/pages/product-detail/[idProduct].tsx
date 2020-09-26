import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT_DETAIL } from '../../graphql/product/product.query';
import withApollo from '../../utils/withApollo'
import { useRouter } from 'next/router'
import styled from 'styled-components';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';


const ProductDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
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

    const { images, name, finalPrice, price, promotionPercent } = products

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = images.map((item, idx) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={idx}
            >
                <img src={`https://media3.scdn.vn/${item}`} />
                <CarouselCaption captionText={'asas'} captionHeader={'asas'} />
            </CarouselItem>
        );
    });

    return (
        <Wrapper>
            <Container>
                <Title>
                    Product Detail
                </Title>
                <ProductContainer>
                    <ImageContainer>
                        <CustomCarousel
                            activeIndex={activeIndex}
                            next={next}
                            previous={previous}
                        >
                            <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                        </CustomCarousel>
                        {/* <Image src={`https://media3.scdn.vn/${images[0]}`} /> */}
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
                    </DetailContainer>
                </ProductContainer>
                <div dangerouslySetInnerHTML={{ __html: products.description }} />
            </Container>
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

const CustomCarousel = styled(Carousel)`
    img {
        max-width: 100%;
    }
`