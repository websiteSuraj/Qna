import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Container, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Loding from '@/components/Loding'
import {Search2Icon} from '@chakra-ui/icons'

export default function Home({post}) {
  const [loading, setloading] = useState(false)
  const [search, setsearch] = useState()

  const handleSubmit= async (e)=>{
    setsearch(e.target.value)
    setloading(true)
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainPage}>
        <Box  m={'auto'} width={'80%'} position={'relative'} top='70px'>
          <div className={styles.postQuery}>
          <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input type="text" placeholder='Enter your query' value={search} onChange={handleSubmit}  required/>
        </InputGroup>


            {loading && <Loding/>}
          </div>
        {post.map((data) => {
        return (
      <li key={data.id}>{data.title}</li>
      )})}
      </Box>
      </main>
      
    </>
  )
}


export async function getServerSideProps(context) {
  const res=await fetch('http://localhost:3000/api/hello')
  const data=await res.json()
  return {
    props: {post:data}, // will be passed to the page component as props
  }
}