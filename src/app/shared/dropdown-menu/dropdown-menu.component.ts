// FIXME
// For this thing isn't closing on document click... not really sure what the deal is.
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer,
  Type,
} from '@angular/core';


@Component({
  selector: 'dropdown-menu-item',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      padding: 4px 10px 4px 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host:hover {
      color: #fff;
      background-color: #4078c0;
    }
  `]
})
export class DropdownMenuItem {

  @Output('click') onContentClick = new EventEmitter<MouseEvent>(true);

  @HostListener('click', ['$event'])
  private _onClick(event: MouseEvent): void {
    if (!event.defaultPrevented) {
      this.onContentClick.emit(event);
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dropdown-menu-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      width: 180px;
      transition: all 0s linear 0.5s;
      position: absolute;
      font-size: 13px;
      color: black;
      display: flex;
      flex-direction: column;
      z-index: 100;
      padding-top: 5px;
      padding-bottom: 5px;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 4px;
      box-shadow: 0 3px 12px rgba(0,0,0,0.15);
      margin: 0 8px;
    }
    :host:before {
      top: -16px;
      right: 9px;
      border: 8px solid transparent;
    }
    :host:after {
      top: -14px;
      right: 10px;
      border: 7px solid transparent;
    }
    :host:before, :host:after {
      border-bottom-color: #fff;
      position: absolute;
      display: inline-block;
      content: "";
    }
    :host.content-opening, :host.content-closing {
      opacity: 0.5;
    }
    :host.content-opened {
      opacity: 1;
    }
    :host.content-closed {
      opacity: 0;
      height: 0;
    }
  `]
})
export class DropdownMenuContent implements AfterContentInit {
  private _edgeMargin: number = 8;
  private _opened: boolean = false;
  private _transition: boolean = false;
  private _top: number;
  private _left: number;

  @ContentChildren(DropdownMenuItem) private _items: QueryList<DropdownMenuItem>;

  @Input('width') private _multiplier: number = 4;

  // TODO default should probably be center, but I need right first
  @Input('align') private _align: 'left' | 'right' | 'center' = 'right';

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) {}

  ngAfterContentInit(): void {
    this._items.forEach( (item: DropdownMenuItem) => this._setupItem(item) );
  }

  @Output('close') onClose = new EventEmitter<void>();
  @Output('close-start') onCloseStart = new EventEmitter<void>();

  @Output('open') onOpen = new EventEmitter<void>();
  @Output('open-start') onOpenStart = new EventEmitter<void>();

  get opened(): boolean { return this._opened; }
  set opened(opened: boolean) {
    this.toggle(opened);
  }

  public open(): void {
    this.toggle(true);
  }

  public close(): void {
    this.toggle(false);
  }

  public toggle(isOpen: boolean = !this._opened): void {
    if (isOpen === this._opened ||
        this._transition) {
      return;
    }

    this._opened = isOpen;
    this._setPosition();
    this._transition = true;

    (this._opened) ? this.onOpenStart.emit(null) : this.onCloseStart.emit(null);
  }

  private _setPosition(): void {
    var styles: {name: string, value: string}[] = [];
    switch (this._align) {
      case 'right':
        styles.push({ name: 'right', value: '0' })
        break;
      default:
        console.debug('Unimplemented alignment', this._align);
    }

    for (let i = 0; i < styles.length; i++) {
      this._renderer.setElementStyle(
        this._elementRef.nativeElement,
        styles[i].name,
        styles[i].value
      )
    }
  }

  private _setupItem(item: DropdownMenuItem): void {
    item.onContentClick.subscribe( () => this.close() );
  }

  @HostListener('transitionend', ['$event']) onTransitionEnd(e: any) {
    (this._opened) ? this.onOpen.emit(null) : this.onClose.emit(null);
    this._transition = false;
  }

  @HostBinding('class.content-opened') private get _isOpened():boolean {
    return this._opened;
  }
  @HostBinding('class.content-closed') private get _isClosed():boolean {
    return !this._opened;
  }
  @HostBinding('style.min-width') private get _minWidth(): string {
    return this._multiplier * 64 + 'px';
  }
}

@Component({
  selector: 'dropdown-menu',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class DropdownMenu implements AfterContentInit {
  private _externalClickListener: Function;
  private _internalClickListener: Function;

  @ContentChild(DropdownMenuContent) private _content: DropdownMenuContent;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
  ) {}

  ngAfterContentInit() {
    this._content.onOpen.subscribe( () => console.debug('content opened') );
    this._content.onClose.subscribe( () => console.debug('content closed') );
    this._content.onCloseStart.subscribe( () => this._removeListeners() );
    this._content.onOpenStart.subscribe( () => this._setupListeners() );
  }

  private _handleExternalClick(event: MouseEvent): void {
    if (event.target !== this._elementRef.nativeElement){
      this._content.close();
    }
  }

  private _handleInternalClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  private _removeListeners(): void {
    this._externalClickListener();
    this._internalClickListener();
  }

  private _setupListeners(): void {
    this._externalClickListener = this._renderer.listenGlobal(
      'document',
      'click',
      this._handleExternalClick.bind(this)
    );

    this._internalClickListener = this._renderer.listen(
      this._elementRef.nativeElement,
      'click',
      this._handleInternalClick.bind(this)
    );
  }
}


export const DROPDOWN_MENU_DIRECTRIVES: Type[] = [
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem
];