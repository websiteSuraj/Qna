import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Container, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loding from '@/components/Loding'
import {Search2Icon} from '@chakra-ui/icons'
import axios from 'axios'
import SearchModal from '@/components/SearchModal'
import { motion as m } from "framer-motion"
import MultipleTag from '@/components/multipleTag'

export default function Home({data}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <m.main className={styles.mainPage} initial={{y:90}} animate={{y:0}} transition={{duration:0.55,ease:"easeOut"}}>
       
        <Box  m={'auto'} width={'60%'} position={'relative'} top='70px'>
          <div className={styles.postQuery}>
          <SearchModal/>
          </div>
          <Box maxHeight={'80vh'} overflow='auto'>
          <MultipleTag/>
          {data?.length > 0 ? (data.map((data)=>{
            return (<div key={data.id} className={styles.cardFront}>
              <Link href={`/posts/${data.id}`}>{data.title? data.title: <div>No title 😂 </div>}</Link>
              <h3>{data.owner_display_name? data.owner_display_name:<div>Anoynomys User😀</div>}</h3>
              <div dangerouslySetInnerHTML={{ __html: data.body.substring(0,300) }} />
            </div>)
          })):<div>No post exits in database</div>}
          </Box>

      </Box>
      </m.main>
      
    </>
  )
}


export async function getServerSideProps(context) {
  console.log(context.query.frontpage)
  const res = await fetch(`http://127.0.0.1:3000/api/hello?search=${context.query.frontpage}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}



