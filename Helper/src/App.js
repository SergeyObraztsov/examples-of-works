import React, { useState, useEffect, useContext } from "react";
import { Avatar, Clock, Box, Button, Select, Text, Heading, Grommet, ResponsiveContext, WorldMap, InfiniteScroll, Layer } from 'grommet';
import './App.css';
import axios from 'axios';

const theme = {
  global: {
    colors: {
      brand: "#1F2833"
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
const dataForList = ['Вопрос 1','Вопрос 2', 'Вопрос 3', 'Вопрос 4','Вопрос 5', 'Вопрос 6', 'Вопрос 7','Вопрос 8', 'Вопрос 9'];



const SearchSelect = ({data}) => {
  const [options, setOptions] = useState(dataForList);
  const [value, setValue] = useState("");

  const {addData, removeData} = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      let result = await axios.post('/process-question', {
        "messageId": "asd",
        "systemId": "erm",
        "nextSystemId": "knowledgeAssistant",
        "sessionInfo": {
            "ucid": "123213rere34132",
            "eduid": "123eee341232ew34",
            "UserId": "Ivanov-II"
        },
        "ermRequest": {
            "requestType": "initialRequest",
            "nlpIntentList": [
                {
                    "intentName": "mainIntent",
                    "intentValue": "WithdrawalFeeLimits"
                }
            ],
            "nlpNerList": [
                {
                    "nerName": "IsFeeOrLimit",
                    "nerValue": "Лимит"
                }
            ],
            "cardAttributeList": null
        }
    });
    console.log(result);
    }

    fetchData();
  }, []);

  return (
    <Box fill>
      <Select
        id="topicsList"
        margin={{"horizontal":"medium"}}
        size="medium"
        placeholder="Select"
        dropHeight="medium"
        value={value}
        options={options}
        onChange={({ option }) => {setValue(option);
                                   removeData();
                                   addData('Интересующая вас тема: ' + option + ' Выберите один из вариантов ответа:');}}
        onClose={() => {setOptions(dataForList);}}
        onSearch={text => {
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
          const exp = new RegExp(escapedText, "i");
          setOptions(dataForList.filter(o => exp.test(o)));
        }}
      />
    </Box>
  );
};

const Message = ({ right, txt}) => {

  return (
      <Box direction="row" pad="medium" align="start" justify={right ? "end" : "start"} fill>
        {right ? '' : <Avatar src="https://studfile.net/html/2706/166/html_KlHYzs0D78.UhwI/img-bDowE2.jpg"/>}
        <Box
          background="brand"
          round="small"
          overflow="hidden"
          pad="small"
          margin={{"horizontal":"small"}}
          >
          
            <Text>{txt}</Text>
        </Box>
        {right ? <Avatar src="https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png"/> : '' }
      </Box>
  );
};

const Dialog = (props) => {
  return (
    <Box fill flex pad="medium" direction="column" background='light-1' overflow="auto">
      <InfiniteScroll items={props.data} {...props}>
        {item => (
          props.data.indexOf(item)%2===0 ? 
          <Message key={item + props.data.indexOf(item)} txt={item}/> : 
          <Message right key={item} txt={item} />
        )}
      </InfiniteScroll>
    </Box>
  );
};

const Map = () => {
  const [open, setOpen] = React.useState();

  const onClose = () => setOpen(undefined);
  return (
      <Box pad="large">
        {open && (
        <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Box direction="row">
              <Heading level={3} margin="none">
                Курсовая работа
              </Heading>
              <Avatar margin={{"left":"large"}} src="https://sun9-21.userapi.com/c846124/v846124867/1d06af/crAOSZYCAX8.jpg" />
            </Box>
            <Text>Студента Финансового университета при Правительстве РФ <br/> Образцова Сергея</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label={
                  <Text color="white">
                    <strong>Закрыть</strong>
                  </Text>
                }
                onClick={onClose}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
        <WorldMap
          color="light-5"
          places={[
            {
              name: 'Sydney',
              location: [55.782126, 37.730168],
              color: 'status-error',
              onClick: () => setOpen(true)
            },
          ]}
        />
      </Box>
  );
};

const ChoiceButton = ({choiceData, data}) => {

  const {addData, } = useContext(Context);

  return(
  <Box fill direction="row" align="center" justify="center">
    {choiceData.map((item) => 
      <Box key={item} align="center" pad="medium">
        <Button id='btn' label={item} onClick={() => {addData(`Ваш ответ: ${item}`)}} />
      </Box>
    )}
  </Box>
  );
};

const AppBar = (props) => ( 
  <Box 
  tag = 'header'
  direction = 'row'
  align = 'center'
  justify = 'between'
  background = 'brand'
  pad = {
    {
      left: 'medium',
      right: 'small',
      vertical: 'small'
    }
  }
  elevation = 'medium'
  style = {{zIndex: '1'}} 
  {...props}
  />
);

  // .fill()
  // .map((_, i) => `Текст сообщения ${i + 1}`);


const Context = React.createContext();

function App(props) {
  const[data, setData] = useState([]);
  const[choiceData] = useState(['Дебетовая', 'Кредитная', 'Бизнес']);

  useEffect(()=>console.log(data))

  const addData = (item) => {
    setData([...data, item]);
  };
  const removeData = () => {
    data.length = 0;
  }

  return (
  <Context.Provider value={{addData, removeData}}>
    <Grommet theme = {theme} themeMode="light" full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box pad="large" background="status-unknown" fill>
          <Box id="proga">
            <AppBar>
              <Heading level='2' margin='small'>FinHelper</Heading>
              <Clock type="digital" size="large"/>
            </AppBar>
            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              <Box
                width='medium'
                background='light-2'
                align='start'
                justify='start'>
                <Heading 
                  margin="medium"
                  level="3"
                >
                  What topic are you interested in?
                </Heading>
                <SearchSelect data={data}/>
                <Map />
              </Box>
              {data.length > 0 ? 
              <Box flex fill direction="column">
                <Dialog data={data}/>
                <Box direction="row" background='light-1' pad="small">
                  <ChoiceButton choiceData={choiceData} data={data}/>
                </Box>
              </Box> 
              : <Box fill flex align="center" justify="center" gap="small" pad="medium" direction="column" 
                      background='light-1' overflow="auto">Select a topic to see the answer</Box>}
            </Box>
          </Box>
        </Box>
      )}
      </ResponsiveContext.Consumer>
    </Grommet>
  </Context.Provider>
  );
}

export default App;