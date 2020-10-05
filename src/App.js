import React, { useEffect, useState } from 'react';
import { 
  Grommet,
  Button,
  Box,
  Heading,
  Select,
  TextInput,
  Main } from 'grommet';
import { theme } from './Theme';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createCard } from './graphql/mutations';
import { listCards } from './graphql/queries';
import { Card } from './Components/Card/Card';
import './App.css';
import { powers } from './powers'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '',power:'' }

function App() {

  const [formState, setFormState] = useState(initialState);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchCards() {
    try {
      const cardData = await API.graphql(graphqlOperation(listCards))
      const cards = cardData.data.listCards.items
      setCards(cards)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addCard() {
    try {
      if (!formState.name || !formState.description) return
      const card = { ...formState }
      setCards([...cards, card])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCard, {input: card}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <Grommet theme={theme} full>
      <Main pad="large" align='center' >
      <Box direction='column' gap='medium' width='medium' pad='medium'>
        <Heading  level='3' alignSelf='center' textAlign='center'> Add Cards</Heading>

        <TextInput onChange={event => setInput('name', event.target.value)} placeholder="Name" value={formState.name}  />
        <TextInput onChange={event => setInput('description', event.target.value)} placeholder="Description" value={formState.description}  />

      <label for="powers">Choose a power:</label>

      <Select name="powers" id="powers" options= {powers.map(power => <option value={power}>{power}</option>)}>  
      </Select>
      </Box>
        {cards.length > 0? cards.map(card => <Card {...card} />) : null}
     
      </Main>
    </Grommet>
  );
}

export default App;
