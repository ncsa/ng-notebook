import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedBreed: Breed = null;
  breedData = [
    new Breed('Appenzeller', 'appenzeller', NaN, null),
    new Breed('Briard', 'briard', NaN, null),
    new Breed('Cotondetulear', 'cotondetulear', NaN, null),
    new Breed('Dhole', 'dhole', NaN, null),
    new Breed('Eskimo', 'eskimo', NaN, null)
  ];
  title = '';
  xScale: d3Scale.ScaleBand = null;
  yScale: d3Scale.ScaleLinear = null;
  height = 200;
  width = 454;
  margin = {top: 30, right: 0, bottom: 30, left: 40};

  constructor(private httpClient: HttpClient) {
    
    let breedCounts: BreedCount = null;
    if (window.hasOwnProperty('breedCounts')) {
      this.title = 'Count by Breed from Workflow Data';
      breedCounts = window['breedCounts'];
    } else {
      this.title = 'Count by Breed from Default Data';
      breedCounts = {
        appenzeller: 4,
        briard: 7,
        cotondetulear: 9,
        dhole: 1,
        eskimo: 3
      };
    }
    this.breedData.forEach(breed => {
      breed.count = breedCounts[breed.slug];
    });

    this.xScale = d3Scale.scaleBand()
    .domain(d3Array.range(this.breedData.length))
    .range([this.margin.left, this.width - this.margin.right])
    .padding(0.1);
    this.yScale = d3Scale.scaleLinear()
      .domain([0, d3Array.max(this.breedData, d => d.count)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);
  }

  showBreedInfo(breed: Breed) {
    this.selectedBreed = breed;
    if (breed && !breed.imgUrl) {
      const url = 'https://dog.ceo/api/breed/' + breed.slug + '/images/random';
      this.httpClient.get(url).subscribe(
        (data) => breed.imgUrl = data['message']
      )
    }
  }
}

class Breed {
  constructor(
    public label: string,
    public slug: string,
    public count: number,
    public imgUrl: string
  ) {}
}

type BreedCount = {[slug: string]: number};
