import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from '../about/about';
import { Journey } from '../journey/journey';
import { SpecialStory } from '../special-story/special-story';
import { Institutions } from '../institutions/institutions';
import { GlobalImpact } from '../global-impact/global-impact';
import { Achievements } from '../achievements/achievements';
import { Spiritual } from '../spiritual/spiritual';
import { SocialMedia } from '../social-media/social-media';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Journey, SpecialStory, Institutions, GlobalImpact, Achievements, Spiritual, SocialMedia],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
