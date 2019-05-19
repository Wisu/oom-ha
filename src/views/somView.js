import { h } from 'hyperapp';

const Header = ({state, actions}) => (
    <div class="container is-fluid">
        <div class="heading">
          <h2 class="title">Österåker GK, Seniorernas - OrderOfMerits 2019</h2>
          <h6 class="title is-4">
            Beräkningar sker manuelt så det kan finnas fel, hittar du något så
            maila mig på: william.sundberg(at)gmail.com
          </h6>
          <h6 class="title is-7">
            Senaste uppdatering gjordes:>[{state.Generated}],
            Klicka på en tävlings datum eller spelaren, för att se resultatet<br />
          </h6>
          <br />
        </div>
    </div>  
);

const ResultList = ({resList, sex,  actions}) => (
  <div class="container">
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th><abbr title="Pos">Pos</abbr></th>
          <th><abbr title="Namn">Namn</abbr></th>
          <th><abbr title="Sum">Summa</abbr></th>
        </tr>
      </thead>
      <tbody>
      {
        resList.filter(item => item.Sex == sex)
          .map(item => 
            <tr onclick={ () => actions.selPlayer(item.Id)}>
              <td>{item.Pos}</td>
              <td class="white-space:nowrap;">{item.Name}</td>
              <td>{item.Sum}</td>
            </tr>
          )
      }
      </tbody>
    </table>
    </div>
);

const GameList = ({games, actions}) => (
    <div class="container">
        <div class="buttons">
          {games.map((item) => <a class="button is-primary" onclick={(event) => 
            actions.selGame(event.target.text.trim())
          }> {item.Date} </a>) }
        </div>
    </div>
);

const ResultViewGameOne = ({game, klass}) => (
  <p>
    <h3>Klass: {klass}</h3>
    <table class="table is-striped">
      <thead>
        <tr>
          <th><abbr title="Pos">Pos</abbr></th>
          <th><abbr title="Namn">Namn</abbr></th>
          <th><abbr title="Slag">Slag</abbr></th>
        </tr>
      </thead>
      <tbody>
      {
          game.filter(item => item.Class == klass)
            .map(item => 
            <tr>
              <td>{item.Pos}</td>
              <td>{item.Name}</td>
              <td>{item.Slag}</td>
            </tr>
            )
      }
      </tbody>
    </table>
  </p>
);

const ResultViewGame = ({game}) => (
  <div>
    <div class="tile">
      <table >
          <tr>
            <th><abbr title="Pos">Datum:&nbsp;</abbr></th>
            <td>&nbsp;{game.Date}</td>
          </tr>
      </table>
    </div>  

    <div class="tile">
      <ResultViewGameOne game={game.Result} klass="A" />
    </div>  
    <br />
    <div class="tile">
      <ResultViewGameOne game={game.Result} klass="B" />
    </div>  
  </div>
);

const ResultViewPlayer = ({player}) => (
  <div>
    <table >
        <tr>
          <th><abbr title="Pos">Namn: </abbr></th>
          <td>{player.Name}</td>
        </tr>
        <tr>
          <th><abbr title="Date">Date: </abbr></th>
          <td>{player.Sum}</td>
        </tr>
        <tr>
          <th><abbr title="Slag">Slag: </abbr></th>
          <td>{player.Pos}</td>
        </tr>
    </table>
      
    <table class="table is-striped">
      <thead>
        <tr>
          <th><abbr title="Pos">Pos</abbr></th>
          <th><abbr title="Date">Date</abbr></th>
          <th><abbr title="Slag">Slag</abbr></th>
        </tr>
      </thead>
      <tbody>
      {
        player.Games.map((item) =>
            <tr>
              <td>{item.Pos}</td>
              <td>{item.Date}</td>
              <td>{item.Slag}</td>
            </tr>
        )
      }
      </tbody>
    </table>

  </div>
);

const ResultView = ({state}) => (
  <div class="container">
    {      
      "Date" in state.selGame ? ( <ResultViewGame game={state.selGame} /> ): (<div />)
    }
    {
      "Name" in state.selPlayer ? ( <ResultViewPlayer player={state.selPlayer} /> ): (<div />)
    }        
  </div>
);

const view = (state, actions) => (
    <div>
      <section class="section">
        <Header state={state} actions={actions} />
      </section>
      
      <section class="section">
        <div class="columns">
          <div class="column is-one-third">
            <GameList games={state.Games} actions={actions} />
            <hr />
            <ResultView state={state} />
          </div>
          <div class="column is-one-third">
            <ResultList resList={state.Result} sex="M" actions={actions} />
          </div>
          <div class="column">
            <ResultList resList={state.Result} sex="K" actions={actions} />
          </div>
        </div>
      </section>

    </div>
);

export default view;
