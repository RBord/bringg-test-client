import { lazy, Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import Container from "./components/container/Container"

const HomePage = lazy(() => import("./views/HomePageView/HomePage"))
const PeoplePage = lazy(() => import("./views/PeoplePageView/PeoplePage"))
const PlanetsPage = lazy(() => import("./views/PlanetsPageView/PlanetsPage"))

function App() {
  return (
    <Container>
      <Navigation />
      <Switch>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/people" exact>
            <PeoplePage />
          </Route>
          <Route path="/planets" exact>
            <PlanetsPage />
          </Route>
          <Redirect to="/" />
        </Suspense>
      </Switch>
    </Container>
  )
}

export default App
