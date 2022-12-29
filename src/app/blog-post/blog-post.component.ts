import { Observable } from 'rxjs/internal/Observable';
import { ContentfulService } from './../services/contentful.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { }

  blogPost$: Observable<any> | undefined;
  blogPost1: Document | null | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.blogPost$ = this.contentfulService.getEntryById(id);
      }
    )

    this.blogPost$!.subscribe(val => this.blogPost1 = val.fields.blogContent);
  }

  _returnHtmlFromRichText(richText: Document | null | undefined) {
    if (richText!.nodeType !== 'document'){
      return '<p>not doc</p>';
    }
    if (richText === undefined || richText === null) {
      return '<p>Error</p>';
    }


    console.log(documentToHtmlString(richText)
    .replace(/<p><\/p>/g, "<p><br></p>")
    .replace(/ {4}/g, '&nbsp;'));

    return documentToHtmlString(richText)
    .replace(/<p><\/p>/g, "<p><br></p>")
    .replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  }


}


