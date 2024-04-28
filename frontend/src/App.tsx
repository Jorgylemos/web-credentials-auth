import { useState } from 'react'
import { createUser } from './api'
import style from './style.module.css'

function Navbar() {
  return (
    <header className={style.navBar}>
      <span>
        Brand
      </span>
      <nav>Hi, User!</nav>
    </header>
  )
}

function SignIn() {
  return (
    <main className={style.signIn}>
      <h1 className={style.layout_title}>Entrar</h1>
      <form>
        <input type="email" placeholder='example@email.com' />
        <input type="password" placeholder='******' />
        <button>Entrar</button>
      </form>
    </main>
  )
}

function SignUp() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [message, setMessage] = useState({
    text: "",
    color: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await createUser({
        email: user.email,
        password: user.password
      })

      if (res.status === 200) {
        setMessage({
          text: "Usuário criado!",
          color: "#4dff17"
        })
      }

    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setMessage({
          text: "Houve um erro!",
          color: "#f51c1c"
        })
      }
    }
  }

  return (
    <main className={style.signUp}>
      <h1 className={style.layout_title}>Cadastrar</h1>
      <form>
        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder='example@email.com' />
        <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder='******' />
        <button onClick={handleSubmit}>Cadastrar</button>
      </form>
      <h1 style={{ color: message.color }}>{message.text}</h1>
    </main>
  )
}

function Dashboard() {
  return (
    <main className={style.dashboard}>
      <h1>Dashboard</h1>
      <h2>Hi, user!</h2>
    </main>
  )
}


function App() {

  return (
    <section className='main_layout'>
      <Navbar />
      <SignIn />
      <SignUp />
      <Dashboard />
    </section>
  )
}

export default App
