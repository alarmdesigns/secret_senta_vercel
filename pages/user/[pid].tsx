import type {
  GetServerSidePropsContext
} from "next";
import { Props, retrieveDataById } from '../../shared';
import Router from 'next/router'
import { ChakraProvider, chakra, Link, shouldForwardProp, Fade, useDisclosure, Collapse, HStack, Flex, Button, Container, Center,Spacer, Stack, Heading, Input, Card, CardBody, Image, Divider, Text, CardFooter , Box} from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion, isValidMotionProp } from 'framer-motion';
import NextLink from 'next/link'


const Post = ({users}: Props) => {

  const { order, name, isComplete, beneficiary, wishlist1, wishlist2, wishlist3 } = users[0];

  const [wishlistState1, setStateWishlist1] = useState(wishlist1);
  const [wishlistState2, setStateWishlist2] = useState(wishlist2);
  const [wishlistState3, setStateWishlist3] = useState(wishlist3);
  const wishlistDiv = useDisclosure();
  const beneficiaryDiv = useDisclosure();
  const resultsButton = useDisclosure();

  const videoLoading = useDisclosure();
  const resultDiv = useDisclosure();

  const currentDate = new Date().toISOString().slice(0, 10)
  const toggleWishListDiv = async () => {
    wishlistDiv.onToggle();
    beneficiaryDiv.onToggle();
   
    // fetch('/api/save/'+order)
    //   .then((res) => res.json())
    //   .then((data) => {
    //  console.log(data)
    //   })

      fetch('/api/save/'+order, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
        wishlist1: wishlistState1,wishlist2: wishlistState2,wishlist3: wishlistState3,isComplete:true,
        updated_date:currentDate
        })
      })
       .then((res) => res.json())
      .then((data) => {
     console.log(data)

     if(isComplete) Router.push('/wishlist')
    })
  }

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});


  const showResults = () => {
    videoLoading.onToggle();
    resultsButton.onToggle();

    setTimeout(() => { 
      beneficiaryDiv.onToggle();
      videoLoading.onToggle();
      resultsButton.onToggle();
      resultDiv.onToggle();
     }, 3000);

  }
  
  const setWishlist1 = (wishlist:string) => {
    setStateWishlist1(wishlist);
  };

  const setWishlist2 = (wishlist:string) => {
    setStateWishlist2(wishlist);
  };

  const setWishlist3 = (wishlist:string) => {
    setStateWishlist3(wishlist);
  };


  if (!isComplete) {

    return (
      <ChakraProvider>
        <Box p='4'>
          
          <Center h='100vh'>
        <Stack spacing={6}>
          
          <Flex>
            <Box>
              <Center h='150px'>
             <Heading as='h1' size='4xl' noOfLines={2}>
                Hello, {name}!!
                </Heading>
                </Center>
            </Box>
            <Spacer />
            <Box p='4'>
              <Image
                boxSize='150px'
                src='https://www.clipartmax.com/png/middle/238-2387061_santa-please-stop-here-personalised-christmas-sign.png'
                alt='santa'
                borderRadius='lg'
              />
            </Box>
          </Flex>
          
          <Collapse in={!wishlistDiv.isOpen} animateOpacity>
            <Stack spacing={2}>
              <Heading as='h3' size='md' noOfLines={3}>
                Palapag muna ng wishlist :)
              </Heading>
              <Input
                placeholder="Something I've been interested with..."
                value={wishlistState1}
                onChange={(event) => setWishlist1(event.target.value)}
                size='sm'
              /> 
              <Input
                placeholder="Something aabot na item this Saturday..."
                value={wishlistState2}
                onChange={(event) => setWishlist2(event.target.value)}
                size='sm'
              />
              <Input
                placeholder="Something nice to have..."
                value={wishlistState3}
                onChange={(event) => setWishlist3(event.target.value)}
                size='sm'
              />

              <Center>
                <Button
                  onClick={toggleWishListDiv}
                      colorScheme='green'
                      size='md'
                      height='48px'
                      width='200px'
                      border='2px'
                  >
                  I-save na yarn!
                </Button>
              </Center>
            
            <Divider />

          </Stack>

          </Collapse>


          <Collapse in={beneficiaryDiv.isOpen} animateOpacity>
            <Stack spacing={6}>
              <Heading as='h3' size='md' noOfLines={3}>
                Up Next! Piliin ang destination ng iyong extra blessings!
              </Heading>
              
              <Center>
                <Button
                  isLoading={resultsButton.isOpen}
                  loadingText='Picking...'
              
                  onClick={showResults}
                      colorScheme='green'
                      size='md'
                      height='48px'
                      width='200px'
                      border='2px'
                  >
                  Larga bola!
                </Button>


              </Center>

            
            <Divider />

          </Stack>

          </Collapse>


           <Collapse in={resultDiv.isOpen} >
            <Stack spacing={2}>
              <Center>
              <Heading mb={16} as='h3' size='md' noOfLines={2}>
                Sharing blessing to:
              </Heading>
              </Center>

              <Center>
              <Container id='res' h="200px" display='flex' alignItems="left" justifyContent="center">
                <ChakraBox
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  // @ts-ignore no problem in operation, although type error appears.
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  padding="2"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100px"
                  height="100px"
                >
                  {beneficiary}
                </ChakraBox>
              </Container>

              </Center>
              <Center>

                <Link color='teal.500' as={NextLink} href='/wishlist'>
                  Check wishlists!
                </Link>

              </Center>
            </Stack>
          </Collapse>

        </Stack>
        </Center>
      </Box>
    </ChakraProvider>
    );



  }
  
  return (
    <ChakraProvider>
      <Box p='4'>
        
        <Center h='100vh'>
      <Stack spacing={6}>
        
        <Flex>
          <Box>
            <Center h='150px'>
           <Heading as='h1' size='4xl' noOfLines={2}>
              Hello, {name}!!
              </Heading>
              </Center>
          </Box>
          <Spacer />
          <Box p='4'>
            <Image
              boxSize='150px'
              src='https://www.clipartmax.com/png/middle/238-2387061_santa-please-stop-here-personalised-christmas-sign.png'
              alt='santa'
              borderRadius='lg'
            />
          </Box>
        </Flex>
        
        <Collapse in={!wishlistDiv.isOpen} animateOpacity>
          <Stack spacing={6}>
            <Heading as='h3' size='md' noOfLines={3}>
              Mag-eedit ulit sya nga wishlist....
            </Heading>
            <Input
              placeholder="Something I've been interested with..."
              value={wishlistState1}
              onChange={(event) => setWishlist1(event.target.value)}
              size='sm'
            /> 
            <Input
              placeholder="Something aabot na item this Saturday..."
              value={wishlistState2}
              onChange={(event) => setWishlist2(event.target.value)}
              size='sm'
            />
            <Input
              placeholder="Something nice to have..."
              value={wishlistState3}
              onChange={(event) => setWishlist3(event.target.value)}
              size='sm'
            />

            <Center>
              <Button
                onClick={toggleWishListDiv}
                    colorScheme='green'
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                >
                Ok, pa-void mamser!
              </Button>
            </Center>
          
          <Divider />

        </Stack>

        </Collapse>


      </Stack>
      </Center>
    </Box>
  </ChakraProvider>
  );
 
}

export default Post

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    return retrieveDataById(query);
}