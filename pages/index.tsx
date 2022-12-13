import { ChakraProvider,Heading, Text, Box, Center, Select, Stack, Button, Link } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Props, retrieveData } from './shared';
import NextLink from 'next/link'

export default function Movies({ users }: Props) {

    const [userState, setUserState] = useState('');

    const setUser = (currentUser:string) => {
        setUserState(currentUser);
    };

    return (
        <ChakraProvider>
            <Box p='4' h='100vh'>
         
                <Center >
               
                <Stack p='8' spacing={6}>

                <Heading as='h3' size='xl' noOfLines={2}>
                    Bisfriends Extended 
                    <Text fontSize='xl'>
                    Christmas Party 2022
                </Text>
                </Heading>
                    <h1>Da hu ka?</h1>
                    <Select 
                        variant='flushed'
                        placeholder='Hanapin ang sarili...'
                        onChange={(event) => {
                            setUser(event?.target?.value);
                        }} 
                    >
                        {users && users.sort(function(a, b){return a.order-b.order}).map((user) => (
                            <option value={user.order}>{user.name}</option>
                        ))}
                    </Select>

                <Center>
                    <Link color='teal.500' href={`/user/${userState}`}>
                        <Button
                            colorScheme='blue'
                            size='md'
                            height='48px'
                            width='200px'
                            border='2px'
                            borderColor='green.500'
                        >
                        Let's vault in!
                        </Button>
                    </Link>

                    </Center>
                <Center>
                <Link mt={15} color='teal.500' as={NextLink} href='/wishlist'>
                  Check wishlists!
                </Link>
                </Center>
                    </Stack>
                </Center>
            </Box>
        </ChakraProvider>
    );
}

export async function getServerSideProps() {
    return retrieveData();
}