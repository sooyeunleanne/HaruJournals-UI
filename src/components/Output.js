import React from "react";
import { Row, Col, Table } from "reactstrap";


export const Outputsubmitted = props => {
const {details} = props;

  return (
    <div className="mt-4">
    <Row>
      <Col sm="12" md={{ size: 16, offset: 300 }}>
        <Table hover>
          <thead>
            <tr>
              {/* <tr> is row */}
              <th>#</th>
              <th>Species</th>
              <th>Facts</th>
              {/* <th> create the header in the row. <Td> normal data in rows */}
            </tr>
          </thead>
          <tbody>
            <RenderTableData details={details} />
          </tbody>
        </Table>
      </Col>
    </Row>
  </div>
);
};
const RenderTableData = props => {
  const { details } = props;
  var count = 0;
  // starting number 0 for #.
  const finalArray = details.sort((a, b) => b.score - a.score);
  // .sort will organize data alphabetically or ascending order. 
  return Object.keys(finalArray).map((i, o) => {
    // Object.keys = displays keys of the object. E.g Name:Kiro(keys=Name)
    // .map will add a  function to the element and display its results. 
    const { Species, Facts } = finalArray[i];
    count = count + 1;
    return (
      <tr key={count.toString(10)}>
        <th scope="row">{count.toString(10)}</th>
        <td>{Species}</td>
        <td>{Facts}</td>
      </tr>
    );
  });
};