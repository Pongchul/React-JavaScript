import './App.css';
import {useState} from 'react';

function Header(props) {
    console.log('props', props)
    return <header>
        <h1><a href="/" onClick={(event)=> {
            event.preventDefault();
            props.onChangMode();
        }}>{props.title}</a></h1>
    </header>;
}

function Create() {
    return <article>
        <h2>Create</h2>
        <form>
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><textarea name="body" placeholder="body"></textarea></p>
            <p><input type="submit" value="Create"></input></p>
        </form>
    </article>;
}

function Nav(props) {
    const lis = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} href={'/read/'+t.id} onClick={event => {
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
            }}>{t.title}</a>
        </li>);
    }
    return <nav>
        <ol>
            {lis}
        </ol>
    </nav>
}

function Article(props) {
    return <article>
        <h2>{props.title}</h2>
        {props.body}
    </article>
}


function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const topics = [
        {id:1, title:'html', body: 'html is ...'},
        {id:2, title:'css', body: 'css is ...'},
        {id:3, title:'javascript', body: 'javascript is ...'}
    ]
    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello Web"></Article>
    } else if (mode === 'READ') {
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    } else if (mode === 'CREATE') {
        content = <Create onCreate = {(title, body) => {

        }}></Create>
    }
  return (
    <div>
        <Header title="REACT" onChangMode = {()=>{
            setMode('WELCOME');
        }}></Header>
        <Nav topics = {topics} onChangeMode ={(_id) => {
            setMode('READ');
            setId(_id)
        }}></Nav>
        {content}
        <a href="/create" onClick= {event =>  {
            event.preventDefault();
            setMode('CREATE');
        }}>Create</a>
    </div>
  );
}

export default App;
