import {Heading,  ChakraProvider,TableContainer, Box, Center, Thead, Table, Tr, Th, Td, Tbody, Tfoot, Link } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Props, retrieveData } from '../shared';
import NextLink from 'next/link'

export default function Wishlist({ users }: Props) {


    return (
        <ChakraProvider>

            <Box p='4' h='100vh'>

            <Heading mb={4} as='h3' size='xl' noOfLines={2}>
                    Wishlist
                   
                </Heading>
         
                <Center >
                <TableContainer>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th >Candidate</Th>
        <Th >Hinihiling Options</Th>
      </Tr>
    </Thead>
    <Tbody>

    {users && users.map((user) => (
                             <Tr>
                                <Td>{user.name}</Td>
                                <Td>
                                    
                                        {user.wishlist1}
                                        
                                        <br/>
                                        {user.wishlist2}
                                        
                                        <br/>
                                        {user.wishlist3}

                                </Td>
                           </Tr>
                        ))}

    </Tbody>
   
  </Table>
</TableContainer>



                </Center>

<Center mt={30}>
<Link color='teal.500' as={NextLink} href='/'>
      Go back!
  </Link>
  </Center>
            </Box>
        </ChakraProvider>
    );
}

export async function getServerSideProps() {
    return retrieveData();
}