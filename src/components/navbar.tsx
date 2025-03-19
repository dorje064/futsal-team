import Navbar from 'react-bootstrap/Navbar';

export const GlobalNavbar = ({ content }: { content: any }) => {
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      {content}
    </Navbar>
  )
}