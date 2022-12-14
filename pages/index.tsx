import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useQuery, useMutation } from '../convex/_generated/react'
import { useCallback, useEffect } from 'react'
import React, { useState } from 'react';

interface LocalizedTextProps {
  language: string,
  text: string,
}

const LocalizedText = (props: LocalizedTextProps) => {
  const [cachedLocalized, setCachedLocalized] = useState(props.text);
  const localizedText = useQuery('getLocalized', props.text, props.language);
  const setLocalized = useMutation('setLocalized');
  useEffect(() => {
    if (localizedText === null) {
      setLocalized(props.text, localizedText, props.language);
    } else if (localizedText) {
      setCachedLocalized(localizedText);
    }
  }, [localizedText]);

  return (<span>{localizedText ?? cachedLocalized}</span>);
};

const Home: NextPage = () => {
  const [language, setLanguage] = useState("English");
  const localize = (text: string) => {
    return <LocalizedText text={text} language={language} />;
  };
  const languages = useQuery('getLanguages') ?? [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js with Convex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {localize("Welcome!")}
        </h1>
        <p>{localize("Our company builds widgets!")}</p>
        <p>{localize("Where is the library?")}</p>
        <select onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((language) =>
            <option value={language} key={language}>{language}</option>
          )}
        </select>
      </main>

    </div>
  )
}

export default Home
