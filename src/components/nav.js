import * as React from 'react';


export class Nav extends React.Component {
  render() {
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} className="ms-md12">
                    <PivotItem linkText='Foo'>
                        <Label>Pivot #1</Label>
                    </PivotItem>
                    <PivotItem linkText='Bar'>
                        <Label>Pivot #2</Label>
                    </PivotItem>
                    <PivotItem linkText='Bas'>
                        <Label>Pivot #3</Label>
                    </PivotItem>
                    <PivotItem linkText='Biz'>
                        <Label>Pivot #4</Label>
                    </PivotItem>
                    <div>
                        content not in a PivotItem
                    </div>
                </Pivot>
            </div>
        </div>
    );
  }
}