import React, { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import "./index.scss";
import { CardContent, Card, Grid } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import UserCourseService from "../../services/UserCourseList.js";

const Semester = () => {
  const { courseList, semesterList } = useContext(UserContext);
  const flattenedSemesterList = [];

  const itemsFromBackend = [];

  semesterList.forEach((semester) => {
    semester.forEach((course) => {
      flattenedSemesterList.push(course);
    });
  });

  courseList.forEach((course) => {
    if (!flattenedSemesterList.includes(course)) {
      itemsFromBackend.push({ id: uuid(), content: course });
    }
  });

  const columnsFromBackend = {};
  columnsFromBackend[[uuid()]] = {
    name: "Classes Taken",
    items: itemsFromBackend,
  };

  semesterList.forEach((semester, index) => {
    var courses = [];
    semester.forEach((course) => {
      courses.push({ id: uuid(), content: course });
    });
    var nameString = "Semester " + String(index + 1);
    columnsFromBackend[[uuid()]] = { name: nameString, items: courses };
  });

  const updateDB = (sourceName, destName, courseName) => {
    var semesterIndex;
    if (sourceName === "Classes Taken") {
      semesterIndex = parseInt(destName[destName.length - 1]) - 1;
      UserCourseService.addCourseToSemester(courseName, semesterIndex);
    } else if (destName === "Classes Taken") {
      semesterIndex = parseInt(sourceName[sourceName.length - 1]) - 1;
      UserCourseService.deleteCourseFromSemester(courseName, semesterIndex);
    } else {
      semesterIndex = parseInt(destName[destName.length - 1]) - 1;
      UserCourseService.addCourseToSemester(courseName, semesterIndex);
      semesterIndex = parseInt(sourceName[sourceName.length - 1]) - 1;
      UserCourseService.deleteCourseFromSemester(courseName, semesterIndex);
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      updateDB(sourceColumn.name, destColumn.name, removed.content);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="container semester">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="split">
          <div className="left">
            <div key={Object.entries(columns)[0][0]}>
              <h2>{Object.entries(columns)[0][1].name}</h2>
            </div>
            <div style={{ margin: 8 }}>
              <Droppable
                droppableId={Object.entries(columns)[0][0]}
                key={Object.entries(columns)[0][0]}
              >
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Card
                        className="droppableCourses"
                        sx={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#DCDCDC",
                        }}
                      >
                        {Object.entries(columns)[0][1].items.map(
                          (item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Card className="draggable">
                                        <CardContent>
                                          {item.content}
                                        </CardContent>
                                      </Card>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          }
                        )}
                        {provided.placeholder}
                      </Card>
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
          <div className="right">
            <Grid
              item
              container
              spacing={0}
              className="child1"
              columns={{ xs: 4, sm: 8, md: 16 }}
            >
              {Object.entries(columns)
                .slice(1)
                .map(([columnId, column], index) => {
                  return (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                      <div key={columnId}>
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                          <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  <Card
                                    className="droppable"
                                    sx={{
                                      background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "#DCDCDC",
                                    }}
                                  >
                                    {column.items.map((item, index) => {
                                      return (
                                        <Draggable
                                          key={item.id}
                                          draggableId={item.id}
                                          index={index}
                                        >
                                          {(provided, snapshot) => {
                                            return (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <Card className="draggable">
                                                  <CardContent>
                                                    {item.content}
                                                  </CardContent>
                                                </Card>
                                              </div>
                                            );
                                          }}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </Card>
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Semester;
