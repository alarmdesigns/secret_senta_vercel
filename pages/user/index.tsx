import { Props, retrieveDataById } from '../shared';
import { ChakraProvider, chakra, Link, shouldForwardProp, Fade, useDisclosure, Collapse, HStack, Flex, Button, Container, Center,Spacer, Stack, Heading, Input, Card, CardBody, Image, Divider, Text, CardFooter , Box} from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion, isValidMotionProp } from 'framer-motion';
import NextLink from 'next/link'


const Post = () => {


    return (
      <ChakraProvider>
        <Box p='4'>
          
          <Center h='100vh'>
       <Link color='teal.500' as={NextLink} href='/'>
      Wrong way ka uy!
  </Link>
  </Center></Box>
    </ChakraProvider>
    );
 
}

export default Post