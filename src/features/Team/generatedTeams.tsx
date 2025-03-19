import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import { useTeams } from "./api"
import { Team } from './types';
import { Player } from '../Player/types';
import { Col, Row } from 'react-bootstrap';

const TeamCard = ({ team }: { team: Team }) => {

  const getTeamSkillSum = (team: Team): number => {
    if (!team.players || team.players.length === 0) return 0;
    return team.players.reduce((sum: number, player: Player) => sum + player.skill, 0);
  };

  return (
    <Card style={{ width: '18rem', marginLeft: '5rem' }}>
      <Card.Title>{team.name}</Card.Title>

      <ListGroup variant="flush">
        {team.players.map((player: Player) =>
          <ListGroup.Item className='d-flex justify-content-between'>
            <div>{player.name}</div>
            <div>
              <Badge bg="warning">{player.skill}</Badge>
            </div>
          </ListGroup.Item>)
        }
      </ListGroup>

      <Card.Footer>
        <Badge bg='warning'>{getTeamSkillSum(team)}</Badge>
      </Card.Footer>
    </Card >)
}

export const GeneratedTeams = () => {
  const { teams } = useTeams()

  return (
    <div>
      <h4> Generated Teams </h4>
      <Row className='mr-5 mt-5'>
        {teams.map(team => <Col md="4">
          <TeamCard team={team} /> </Col>)}
      </Row>
    </div>
  )
}