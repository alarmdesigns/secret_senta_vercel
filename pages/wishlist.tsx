import { ChakraProvider,TableContainer, Box, Center, Thead, Table, Tr, Th, Td, Tbody, Tfoot, Link } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Props, retrieveData } from './shared';
import NextLink from 'next/link'

export default function Wishlist({ users }: Props) {


    return (
        <ChakraProvider>
            <Box p='4' h='100vh'>
         
                <Center >
                <TableContainer>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th rowSpan={2}>Contestant</Th>
        <Th colSpan={3}>Mga hinihiling</Th>
      </Tr>
      <Tr>

      <Th>(1)</Th>
      <Th>(2)</Th>
      <Th>(3)</Th>
      </Tr>
    </Thead>
    <Tbody>

    {users && users.sort(function(a, b){return a.order-b.order}).map((user) => (
                             <Tr>
                                <Td>{user.name}</Td>
                                <Td>
                                    
                                        {user.wishlist1}

                                </Td>
                                <Td>
                                    
                                        {user.wishlist2}

                                </Td>
                                <Td>
                                    
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