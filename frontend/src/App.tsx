import { useState } from 'react'
import { authUser, createUser } from './api'
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from './redux/user/userSlice'
import { RootState } from './redux/store'

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

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data } = await authUser({
        email: user.email,
        password: user.password
      })

      dispatch(setAuth(data))

    } catch (err: any) {
      if (err.response || err.response.status === 400) {
        console.error(err)
      }
    } finally {
      setLoading(false)
      setUser({
        email: "",
        password: ""
      })
    }
  }

  return (
    <main className={style.signIn}>
      <h1 className={style.layout_title}>Entrar</h1>
      <form>
        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder='example@email.com' />
        <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder='******' />
        {loading ? <button>Loading</button> : <button onClick={handleLogin}>Entrar</button>}
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

  const user = useSelector((state: RootState) => state.user)

  console.log(user)

  return (
    <main className={style.dashboard}>
      <h1>Dashboard</h1>
      <h2>Hi,</h2>
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
